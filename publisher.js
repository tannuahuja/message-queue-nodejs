const amqp = require('amqplib');
  
const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'message_queue';
    const message = 'Hello, RabbitMQ!'; 

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Message sent: ${message}`);
 
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
};

sendMessage();
  
