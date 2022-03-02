import { GameRepository } from '../repository/game.repository';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, AfterLoad, AfterUpdate, EventSubscriber, EntitySubscriberInterface } from 'typeorm'
import { Publisher } from './publisher.entity';

@Entity()
//extending BaseEntity means you are using an active record, that means you are using the models directly to query
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    title: string;
    @Column({ default: 0 })
    price: number;
    @ManyToOne(type => Publisher, publisher => publisher.id, { eager: true, onDelete: 'CASCADE', })
    publisher: string;
    @Column('text', { array: true })
    tags: string[]
    @Column({ default: new Date(), type: 'date' })
    releaseDate: Date
    @CreateDateColumn()
    createdDate?: Date
    @UpdateDateColumn()
    lastUpdateDate?: Date

    @AfterUpdate()
    updateLastUpdatefield?() {
        this.lastUpdateDate = new Date();
    }

}


@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface<Game> {
    /**
     * Called after entity is loaded.
     */
    listenTo() {
        return Game;
    }
    afterLoad(entity: Game) {
        const gameRepo = new GameRepository()
        gameRepo.removeGamesOlderThan18MonthsAndApplyDiscount()
    }
}