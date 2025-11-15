// OrderDto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, Min, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDto } from "../../OrderItem/dto/OrderItem.dto";

export class OrderDto {

    @ApiProperty({
        description: "ID do usuário",
        example: 2
    })
    @IsNumber({}, { message: "userId deve ser um número" })
    @Min(1, { message: "userId deve ser maior que 0" })
    userId: number;

    @ApiProperty({
        description: "Preço total do pedido",
        example: 150.00
    })
    @IsNumber({}, { message: "priceTotal deve ser um número" })
    @Min(0, { message: "Preço total não pode ser negativo" })
    priceTotal: number;

    @ApiProperty({
        description: "Itens do pedido",
        type: [OrderItemDto]
    })
    @IsArray({ message: "items deve ser um array" })
    @ArrayMinSize(1, { message: "Um pedido deve ter pelo menos um item" })
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
