import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

@Entity()
//extending BaseEntity means you are using an active record, that means you are using the models directly to query
export class Publisher {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    name: string;
    @Column({ default: 0 })
    siret: number;
    @Column()
    phone: string
}