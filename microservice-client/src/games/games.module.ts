import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GamesController } from './games.controller';
@Module({
  imports: [ConfigModule],
  controllers: [GamesController],
  providers: [
    {
      provide: 'GAME_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('GAME_SERVICE_HOST'),
            port: configService.get('GAME_SERVICE_PORT'),
          }
        })
      ),
      inject: [ConfigService],
    }
  ]
})
export class GamesModule { }
