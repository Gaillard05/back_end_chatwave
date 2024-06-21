import { Controller, Get, Inject } from '@nestjs/common';
import * as amqp from 'amqplib';

@Controller('health')
export class HealthController {
  @Get()
  async healtCheck(): Promise<string> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'health_check';

    await channel.assertQueue(queueName, {durable: false});

    const message = 'Health Check Job';

    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Job '${message}' sent to queue '${queueName}'.`);

    
    await channel.close();
    await connection.close();

    return 'OK';
  }
}