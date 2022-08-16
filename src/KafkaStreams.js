const EventEmitter = require("events");
const KafkaJSClient = require("./client/KafkaJSClient")
const KafkaSchema  = require("./client/KafkaSchema")
class KafkaStreams extends EventEmitter{
    /**
     * Can be used as factory to get
     * injected with a KafkaClient instance
     * @param {object} config
     * @param {function} logCreator
     */
    constructor(config, logCreator = null) {
        super();
        //Setup log
        this.log = !logCreator || false ? console : logCreator;
        //All the config
        this.config = config;
        if (!this.config || typeof this.config !== "object") {
            throw new Error("Config must be a valid object.");
        }

        // Kafka client
        let { client } = config;
        this.kafkaclient = null;
        try{
            this.kafkaclient = new KafkaJSClient(client, logCreator).getClient();
        }catch (e) {
            throw new Error(`Error to create kafka client. ${e}`);
        }

        // Schema registry
        this.schemaClient = null;
        let { schemaConfig } = config;
        try{
            this.schemaClient = new KafkaSchema(schemaConfig, logCreator);
        }catch (e) {
            throw new Error(`Error to create kafka schema client. ${e}`);
        }



    }

    from(topic){
        if ( !topic || topic === ""){
            throw new Error("Kafka topic is required")
        }
        if(!this.kafkaclient){
            throw new Error("Kafka client error")
        }
        // this.log.info(this.config)
    }

    to(topic){

    }

    start(){

    }

}

module.exports = KafkaStreams;