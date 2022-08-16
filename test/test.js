const KafkaStreams = require("../src/KafkaStreams")
const config = require("config")
const kafka = config.get("kafka")
// console.log(`Without stringtify: ${kafka}`)
// console.log(`With stringtify: ${JSON.stringify(kafka)}`)

const stream = new KafkaStreams(kafka);
console.log(stream.kafkaclient.logger())