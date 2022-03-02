import { GameDto } from '../dto/game.dto';
import { Repository, EntityRepository, MoreThan, Between } from 'typeorm'
import { Game } from '../entities/game.entity';
import * as moment from "moment";
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
    async findGame(id: string): Promise<Game> {
        const foundGame = await this.findOne({ id })
        return foundGame
    }
    async createGame(createGameDTO: GameDto): Promise<Game> {
        const createGame: Game = {
            title: createGameDTO.title,
            price: createGameDTO.price,
            publisher: createGameDTO.publisher,
            tags: createGameDTO.tags,
            releaseDate: createGameDTO.releaseDate
        }
        const createdRecord = this.create(createGame)
        await this.save(createGame)
        return createdRecord
    }

    async updateGame(updateGameInfo): Promise<Game> {
        const findGame = await this.findGame(updateGameInfo.id)
        if (findGame) {
            const { title, price, publisher, tags, releaseDate } = updateGameInfo?.updateGame
            findGame.price = price;
            findGame.publisher = publisher;
            findGame.releaseDate = releaseDate;
            findGame.tags = tags;
            findGame.title = title
            return await this.save(findGame)

        }
        return null
    }

    async deleteGame(id: string): Promise<void> {
        const findGame = await this.findGame(id)
        if (!findGame) return null
        await this.delete({ id })
        return null

    }

    async getGames(): Promise<Game[]> {
        return this.find({})
    }

    async getGamesByPublisher(publisherId: string): Promise<Game[]> {
        return this.find({ publisher: publisherId })
    }

    getDates = () => {
        const get18MonthFromToday = moment().subtract(18, 'month').format('YYYY-MM-DD')
        const get12MonthFromToday = moment().subtract(12, 'month').format('YYYY-MM-DD')
        return [get18MonthFromToday, get12MonthFromToday]
    }
    async removeGamesOlderThan18MonthsAndApplyDiscount(): Promise<void> {
        const [findRecordsOlder18Month, findRecordsBtw12And18Month] = await Promise.all([
            this.find({
                where:
                    [{ releaseDate: MoreThan(moment(this.getDates[0]).format('YYYY-MM-DD')) }]
            }),
            this.find({
                where:
                    [{ releaseDate: Between(moment(this.getDates[1]).format('YYYY-MM-DD'), moment(this.getDates[0]).format('YYYY-MM-DD')) }]
            })
        ])

        if (findRecordsOlder18Month) {
            await this.remove(findRecordsOlder18Month)
            //apply discount of 20% to all games having a release date between 12 and 18 months.
            if (findRecordsBtw12And18Month) {
                findRecordsBtw12And18Month.map(async (data) => {
                    await this.update({ releaseDate: Between(moment(this.getDates[0]).format('YYYY-MM-DD'), moment(this.getDates[1]).format('YYYY-MM-DD')) }, {
                        price: 0.02 * data.price
                    })
                })

            }
        }
    }
}