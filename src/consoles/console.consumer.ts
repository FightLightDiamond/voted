import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('socket.io')
export class ConsoleConsumer {
  @Process()
  handleMessageEmitClient(job: Job): void {
    const data = job.data;
    console.log('sendDataToRoom....', data);
  }
}
