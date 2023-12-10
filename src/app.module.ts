import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PubsubModule } from './graphql/pubsub/pubsub.module';
import { PubSub } from './graphql/pubsub/pubsub';

import { SampleResolver } from './graphql/sample.resolver';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      imports: [PubsubModule],
      driver: MercuriusDriver,
      useFactory: (pubsub: PubSub): MercuriusDriverConfig => {
        const isDev = process.env.NODE_ENV !== 'production';
        return {
          autoSchemaFile: isDev
            ? path.join(process.cwd(), 'src/graphql/schema.gql')
            : true,
          subscription: {
            pubsub: pubsub,
          },
          graphiql: true,
        };
      },
      inject: ['PUB_SUB'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SampleResolver],
})
export class AppModule {}
