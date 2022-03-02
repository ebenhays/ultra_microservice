import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublisherController } from './publisher.controller';

@Module({
  imports: [ConfigModule],
  controllers: [PublisherController],
  providers: [
    {
      provide: 'PUBLISHER_SERVICE',
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('PUBLISHER_SERVICE_HOST'),
            port: configService.get('PUBLISHER_SERVICE_PORT'),
          }
        })
      ),
      inject: [ConfigService],
    }
  ]
})
export class PublisherModule { }
