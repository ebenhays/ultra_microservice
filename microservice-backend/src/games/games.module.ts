import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameRepository } from '../repository/game.repository';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository])],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule { }
