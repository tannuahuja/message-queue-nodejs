const amqp = require('amqplib');

const receiveMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'message_queue';

    await channel.assertQueue(queue, { durable: false });
    console.log(`Waiting for messages. To exit, press CTRL+C`);

    channel.consume(queue, (message) => {
      console.log(`Received message: ${message.content.toString()}`);
    }, { noAck: true });
  } catch (error) {
    console.error('Error receiving message:', error.message);
  }
};

receiveMessage();
