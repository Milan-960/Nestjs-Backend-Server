import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PubsubModule } from './graphql/pubsub/pubsub.module';
import { PubSub } from './graphql/pubsub/pubsub';

import { SampleResolver } from './graphql/sample.resolver';
import * as path from 'path';

@Module({
  imports: [
    // Configuration settings
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Database connection
    TypeOrmModule.forRoot(databaseConfig),
    // GraphQL module
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
  // Controllers and providers are injected here for dependency injection and DI to work
  controllers: [AppController],
  providers: [AppService, SampleResolver],
})
export class AppModule {}
