import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventHandlerService {
  private readonly logger = new Logger(EventHandlerService.name);

  async handleEvent(message: string) {
    this.logger.log(`Handling event with message: ${message}`);

    return true;
  }
}
