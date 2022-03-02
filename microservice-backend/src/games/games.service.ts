import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Game } from '../entities/game.entity';
import { GameRepository } from '../repository/game.repository';
import { GameDto } from '../dto/game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(GameRepository)
        private gameRepository: GameRepository
    ) {

    }
    welcome() {
        return 'Welcome to game service'
    }
    async createGame(createGame: GameDto): Promise<Game> {
        return await this.gameRepository.createGame(createGame)
    }
    async updateGame(updateDto: GameDto): Promise<Game> {
        return await this.gameRepository.updateGame(updateDto)
    }

    async deleteGame(gameId: string): Promise<void> {
        return await this.gameRepository.deleteGame(gameId)
    }

    async getGames(): Promise<Game[]> {
        return await this.gameRepository.getGames()
    }

    async getGamesByPublisher(publisherId: string): Promise<Game[]> {
        return await this.gameRepository.getGamesByPublisher(publisherId)
    }

}
