import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GameDto } from 'src/dto/game.dto';
import { GAME_PATTERN } from '../message.patterns';

@Controller('games')
export class GamesController {
    constructor(@Inject('GAME_SERVICE') private gameService: ClientProxy) { }
    async onApplicationBootstrap() {
        await this.gameService.connect();
    }
    @Get('/welcome')
    welcome() {
        return this.gameService.send({ cmd: GAME_PATTERN.WELCOME }, '')
    }
    @Post()
    async createGame(@Body() createGame: GameDto) {
        return this.gameService.send({ cmd: GAME_PATTERN.CREATE_GAME }, createGame)
    }

    @Put(':id')
    updateGame(@Body() updateGame: GameDto, @Param('id') id: string) {
        return this.gameService.send({ cmd: GAME_PATTERN.UPDATE_GAME }, { updateGame, id })
    }

    @Delete(':id')
    deleteGame(@Param('id') id: string) {
        return this.gameService.send({ cmd: GAME_PATTERN.DELETE_GAME }, id)
    }

    @Get()
    getGames() {
        return this.gameService.send({ cmd: GAME_PATTERN.GET_GAMES }, '')
    }

    @Get('/:id/publisher')
    getGamesByPublisher(@Param('id') id: string) {
        return this.gameService.send({ cmd: GAME_PATTERN.GET_GAME_BY_PUBLISHER }, id)
    }

}
