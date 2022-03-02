import { PublisherDto } from '../dto/publisher.dto';
import { Repository, EntityRepository } from 'typeorm'
import { Publisher } from '../entities/publisher.entity';

@EntityRepository(Publisher)
export class PublisherRepository extends Repository<Publisher> {
    async createPublisher(publisherInfo: PublisherDto): Promise<Publisher> {
        const createPublisher: Publisher = {
            name: publisherInfo.name,
            siret: publisherInfo.siret,
            phone: publisherInfo.phone
        }

        const createdPublisher = this.create(createPublisher)
        await this.save(createPublisher);
        return createdPublisher
    }

    async getPublisher(publisherId: string): Promise<Publisher> {
        const result = await this.findOne({ id: publisherId })
        if (result) return result
        return null
    }

    async getPublishers(): Promise<Publisher[]> {
        return await this.find({})
    }

    async deletePublisher(publisherId: string): Promise<void> {
        const findRecord = await this.getPublisher(publisherId)
        if (findRecord) {
            await this.delete({ id: publisherId })
            return null
        }
        return null

    }

    async updatePublisher(publisherId: string, publisherInfo: PublisherDto): Promise<Publisher> {
        const findRecord = await this.getPublisher(publisherId)
        console.log(findRecord)
        if (findRecord) {
            findRecord.name = publisherInfo.name,
                findRecord.phone = publisherInfo.phone,
                findRecord.siret = publisherInfo.siret
            return await this.save(findRecord)
        }
        return null

    }
}