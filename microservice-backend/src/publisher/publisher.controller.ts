import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PublisherDto } from '../dto/publisher.dto';
import { Publisher } from '../entities/publisher.entity';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisher: PublisherService) { }
    @MessagePattern({ cmd: 'create-publisher' })
    createPublisher(@Body() publisherInfo: PublisherDto): Promise<Publisher> {
        return this.publisher.createPublisher(publisherInfo)
    }

    @MessagePattern({ cmd: 'get-publisher' })
    getPublisher(id: string): Promise<Publisher> {
        return this.publisher.getPublisher(id)
    }

    @MessagePattern({ cmd: 'get-publishers' })
    getPublishers(): Promise<Publisher[]> {
        return this.publisher.getPublishers()
    }

    @MessagePattern({ cmd: 'delete-publishers' })
    deletePublisher(id: string): Promise<void> {
        return this.publisher.deletePublisher(id)
    }

    @MessagePattern({ cmd: 'update-publishers' })
    updatePublisher(@Body() publisherInfo): Promise<Publisher> {
        const { id, info } = publisherInfo
        return this.publisher.updatePublisher(id, info)
    }
}
