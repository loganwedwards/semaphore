var mosca = require('mosca')

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://192.168.1.38:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
}
// For MQTT (node only)
// var settings = {
//   port: 1883,
//   backend: ascoltatore
// }

// This exposes a WS connection for browsers
const settings = {
  http: {
    port: 3001
  },
  // Note that all retained messages will be deleted
  // on server restarts. Use Redis or Mongo for real
  // persistence
  persistence: {
    factory: mosca.persistence.Memory
  }
}

var server = new mosca.Server(settings)

server.on('clientConnected', function(client) {
  console.log('client connected', client.id)
})

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet)
})

server.on('ready', setup)

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}

