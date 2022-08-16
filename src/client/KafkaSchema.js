class KafkaSchema{
    constructor(config, logCreator = console) {
        //Setup log
        logCreator.log(`Configuration for the schema: ${JSON.stringify(config)}`)
        // this.log.info(`This is: ${this}`)
    }
}

module.exports = KafkaSchema;