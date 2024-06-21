import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  @EventPattern('add-job')
  async handleAddJob(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('Received job :', JSON.stringify(data));
    this.logger.log('Job processed:', JSON.stringify(data));
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
