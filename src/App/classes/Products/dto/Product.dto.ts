import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min, IsString, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export class ProductDto {

    @ApiProperty({
        description: 'Nome do produto',
        example: 'Pizza de Calabresa'
    })
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsString({ message: "Deve ser uma string" })
    name: string;

    @ApiProperty({
        description: 'Descrição do produto',
        example: 'Deliciosa pizza com calabresa'
    })
    @IsNotEmpty({ message: "Descrição não pode ser vazia" })
    @IsString({ message: "Deve ser uma string" })
    description: string;

    @ApiProperty({
        description: 'Preço do produto',
        example: 45.5
    })
    @Type(() => Number)
    @IsNumber({}, { message: "Preço deve ser um número" })
    @Min(0, { message: "Preço não pode ser negativo" })
    price: number;

    @ApiProperty({
        description: 'Imagem do produto',
        type: 'string',
        format: 'binary'
    })
    @IsOptional()
    productImage?: Buffer;
}
