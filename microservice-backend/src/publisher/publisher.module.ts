import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublisherRepository } from '../repository/publisher.repository';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherRepository])],
  controllers: [PublisherController],
  providers: [PublisherService]
})
export class PublisherModule { }
