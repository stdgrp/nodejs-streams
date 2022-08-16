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
        //All the config
        this.config = config;
        if (!this.config || typeof this.config !== "object") {
            throw new Error("Config must be a valid object.");
        }

        // Kafka client
        let { client } = config;
        this.kafkaclient = null;
        try{
            this.kafkaclient = new KafkaJSClient(client).getClient();
        }catch (e) {
            throw new Error(`Error to create kafka client. ${e}`);
        }

        // Schema registry
        this.schemaClient = null;
        let { schemaConfig } = config;
        try{
            this.schemaClient = new KafkaSchema(schemaConfig);
        }catch (e) {
            throw new Error(`Error to create kafka client. ${e}`);
        }



    }

    from(topic){
        if ( !topic || topic === ""){
            throw new Error("Kafka topic is required")
        }
        if(!this.kafkaclient){
            throw new Error("Kafka client error")
        }
        console.log(this.config)
    }

    to(topic){

    }

    start(){

    }

}

module.exports = KafkaStreams;