import { Body, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Game } from '../entities/game.entity';
import { GameDto } from '../dto/game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gameService: GamesService) { }
    @MessagePattern({ cmd: 'welcome' })
    welcome() {
        return this.gameService.welcome()
    }
    @MessagePattern({ cmd: 'create-game' })
    createGame(@Body() createGame: GameDto): Promise<Game> {
        return this.gameService.createGame(createGame)
    }
    @MessagePattern({ cmd: 'update-game' })
    updateGame(@Body() updateGame: GameDto): Promise<Game> {
        return this.gameService.updateGame(updateGame)
    }
    @MessagePattern({ cmd: 'delete-game' })
    deleteGame(id: string): Promise<void> {
        return this.gameService.deleteGame(id)
    }

    @MessagePattern({ cmd: 'get-all-games' })
    getGames(): Promise<Game[]> {
        return this.gameService.getGames()
    }

    @MessagePattern({ cmd: 'get-game-byPublisher' })
    getGamesByPublisher(id: string): Promise<Game[]> {
        return this.gameService.getGamesByPublisher(id)
    }

}
