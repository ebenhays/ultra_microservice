import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { PublisherModule } from './publisher/publisher.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { GameSubscriber } from './entities/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../../.env'] }),
    GamesModule,
    PublisherModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: +process.env.POSTGRES_DB_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: ["error"],
    })],
})
export class AppModule { }
