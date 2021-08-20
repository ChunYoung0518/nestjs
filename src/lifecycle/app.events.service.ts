import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class AppEventsService
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  onApplicationBootstrap(): any {
    console.log('app boot strap....');
  }

  onApplicationShutdown(signal?: string): any {
    console.log('app shut down....');
  }
}
