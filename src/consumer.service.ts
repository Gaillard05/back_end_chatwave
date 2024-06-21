import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { EventHandlerService } from './event-handler.service'; 
@Injectable()
export class Consumer {
  private readonly logger = new Logger(Consumer.name);

  constructor(private readonly eventHandlerService: EventHandlerService) {
    this.setupConsumer().catch((err) => {
      this.logger.error(`Erreur lors de la configuration du consumer RabbitMQ: ${err}`);
    });
  }

  private async setupConsumer() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'health_check';

    await channel.assertQueue(queueName, { durable: false });

    this.logger.log(`Waiting for messages in queue '${queueName}'...`);

    channel.consume(queueName, async (message) => {
      if (message !== null) {
        const content = message.content.toString();
        this.logger.log(`Received message: ${content}`);

        // Traitement du message avec l'EventHandlerService
        await this.eventHandlerService.handleEvent(content);

        channel.ack(message); // Accuser réception du message après traitement
      }
    });
  }
}
