import { IsEnum, isNotEmpty, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PublisherDto {
    @IsNotEmpty({ message: 'Publisher name is required' })
    name: string
    @IsNotEmpty({ message: 'siret is required' })
    siret: number
    @IsNotEmpty({ message: 'Please enter a valid phone number' })
    phone: string


}