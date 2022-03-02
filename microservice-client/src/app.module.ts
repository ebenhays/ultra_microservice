import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../../.env'] }),
    GamesModule,
    PublisherModule,
  ]
})
export class AppModule { }
