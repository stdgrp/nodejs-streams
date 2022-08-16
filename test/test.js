const KafkaStreams = require("../src/KafkaStreams")
const config = require("config")
const log = require("./logcreator")

const kafka = config.get("kafka")



const stream = new KafkaStreams(kafka, logCreator = log);
console.log(stream.kafkaclient.logger())