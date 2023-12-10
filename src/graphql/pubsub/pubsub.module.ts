import { Module } from '@nestjs/common';
import { PubSub } from './pubsub';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubsubModule {}
