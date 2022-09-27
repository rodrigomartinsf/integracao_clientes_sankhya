const { Connection, Channel, connect } = require('amqplib')

class RabbitmqServer {

  constructor() {
    this.uri = {host: 'localhost', port: 5672, username: 'admin', password: 125687}
  }

  async start() {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async close() {
    await this.conn.close()
    console.log('Close RabbitMQ')
  }

  async publishInQueue(queue, message) {
    await this.channel.sendToQueue(queue, Buffer.from(message))
  }
}

module.exports = RabbitmqServer