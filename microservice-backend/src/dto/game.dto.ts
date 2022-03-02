import { IsArray, IsDate, IsDateString, IsDecimal, IsNotEmpty, IsUUID } from "class-validator";

export class GameDto {
    @IsNotEmpty({ message: 'Title is required' })
    title: string;
    @IsNotEmpty({ message: 'Price is required' })
    price: number
    @IsNotEmpty({ message: 'Publisher is required' })
    @IsUUID()
    publisher: string
    @IsArray()
    tags: string[]
    @IsNotEmpty()
    releaseDate: Date
}