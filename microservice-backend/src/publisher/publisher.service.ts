import { Injectable } from '@nestjs/common';
import { PublisherDto } from '../dto/publisher.dto';
import { Publisher } from '../entities/publisher.entity';
import { PublisherRepository } from '../repository/publisher.repository';

@Injectable()
export class PublisherService {
    constructor(private readonly publisherRepository: PublisherRepository) { }

    async createPublisher(publisherInfo: PublisherDto): Promise<Publisher> {
        return await this.publisherRepository.createPublisher(publisherInfo)
    }

    async getPublisher(publisherId: string): Promise<Publisher> {

        return await this.publisherRepository.getPublisher(publisherId)
    }

    async getPublishers(): Promise<Publisher[]> {
        return await this.publisherRepository.getPublishers()
    }

    async deletePublisher(publisherId: string): Promise<void> {
        return await this.publisherRepository.deletePublisher(publisherId)
    }

    async updatePublisher(publisherId: string, publisherInfo: PublisherDto): Promise<Publisher> {
        return await this.publisherRepository.updatePublisher(publisherId, publisherInfo)
    }
}
