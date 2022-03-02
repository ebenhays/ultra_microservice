import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PUBLISHER_PATTERN } from 'src/message.patterns';
import { PublisherDto } from '../dto/publisher.dto';

@Controller('publisher')
export class PublisherController {
    constructor(@Inject('PUBLISHER_SERVICE') private publisherService: ClientProxy) { }
    async onApplicationBootstrap() {
        await this.publisherService.connect();
    }

    @Post()
    createPublisher(@Body() publisherInfo: PublisherDto) {
        return this.publisherService.send({ cmd: PUBLISHER_PATTERN.CREATE_PUBLISHER }, publisherInfo)
    }

    @Get(':id')
    getPublisher(@Param('id') id: string) {
        return this.publisherService.send({ cmd: PUBLISHER_PATTERN.GET_PUBLISHER }, id)
    }

    @Get()
    getPublishers() {
        return this.publisherService.send({ cmd: PUBLISHER_PATTERN.GET_PUBLISHERS }, '')
    }

    @Delete(':id')
    deletePublisher(@Param('id') id: string) {
        return this.publisherService.send({ cmd: PUBLISHER_PATTERN.DELETE_PUBLISHERS }, id)
    }

    @Put(':id')
    updatePublisher(@Param('id') id: string, @Body() publisherInfo: PublisherDto) {
        const data = {
            id,
            info: publisherInfo
        }
        return this.publisherService.send({ cmd: PUBLISHER_PATTERN.UPDATE_PUBLISHERS }, data)
    }

}
