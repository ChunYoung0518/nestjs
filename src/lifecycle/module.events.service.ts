import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ModuleEventsService implements OnModuleInit, OnModuleDestroy {
  onModuleInit(): any {
    console.log('On module init.....');
  }

  onModuleDestroy(): any {
    console.log('On module destroy.....');
  }
}
