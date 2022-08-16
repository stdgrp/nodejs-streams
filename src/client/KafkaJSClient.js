"use strict";

const { Kafka, logLevel, Drainer, Publisher } = require("kafkajs");


class JSKafkaClient {

    /**
     * KafkaClient (EventEmitter)
     * that wraps an internal instance of a
     * kafkajs kafka- Consumer and/or Producer
     * @param topic
     * @param config
     * @param logCreator
     */
    constructor(config, logCreator = null) {
        this._kafkaStreams = null;
        // as queue
        this.messages = []
        //Setup log
        this.log = !logCreator ? logCreator : console;

        this.config = config;
        if(!config.brokers || config.brokers.length === 0){
            throw new Error("Please provide a broker list in your configuration.");
        }
        if(!config.clientId || config.clientId.length ===0){
            throw new Error("Please provide the client ID in your configuration.");
        }
        if(config.sasl && config.clientId.length > 0){
            if(!config.sasl.mechanism || config.sasl.mechanism.length === 0
            || !config.sasl.username || !config.sasl.username.length === 0
            || !config.sasl.password || config.sasl.password.length === 0){
                throw new Error(`This config: ${config.sasl} authentication mechanism in the configuration is wrong.`);
            }

        }
        let loggerLevel = logLevel.INFO;
        switch (config.logLevel) {
            case "DEBUG":
                loggerLevel = logLevel.DEBUG;
                break;
            case "ERROR":
                loggerLevel = logLevel.ERROR;
                break;
            case "WARN":
                loggerLevel = logLevel.WARN;
                break;
            default:
                loggerLevel = logLevel.INFO;

        }

        this.clientConfig = {
            brokers: config.brokers,
            clientId: config.clientId,
            logLevel: loggerLevel,
            authenticationTimeout: config.authenticationTimeout || 10000,
            reauthenticationThreshold: config.reauthenticationThreshold || 10000,
            ssl: config.ssl || true,
            sasl: !config.sasl ? {} : {
                mechanism: config.sasl.mechanism,
                username: config.sasl.username, password: config.sasl.password
            },
            connectionTimeout: config.connectionTimeout || 3000,
            requestTimeout: config.requestTimeout || 25000,
            enforceRequestTimeout: config.enforceRequestTimeout || false,
            retry: !config.retry ? {} : {
                initialRetryTime: config.retry.initialRetryTime || 100,
                retries: config.retry.retries || 8
            }
        }
        this.log.info(`The kafka client config is: ${JSON.stringify(this.clientConfig)}`)
        if (!this.config || typeof this.config !== "object") {
            throw new Error("Config must be a valid object.");
        }
    }

    /**
     * overwrites the internal kafkaStreams reference
     * @param reference
     */
    setKafkaStreamsReference(reference) {
        this._kafkaStreams = reference;
    }

    /**
     * creates a new Kafka client and parse the configuration values
     * no consumer will be build
     * @param {Object} most.js stream
     * @returns {Kafka}
     */
    getClient() {
        try{
            return new Kafka(this.clientConfig);
        }catch (e) {
            throw new Error(`The kafka client could not be created. ${e}`);
        }

    }
}

module.exports = JSKafkaClient;