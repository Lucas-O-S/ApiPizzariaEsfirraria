// OrderItemDto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class OrderItemDto {

    @ApiProperty({
        description: "ID do pedido",
        example: 1
    })
    @IsNumber({}, { message: "orderId deve ser um número" })
    @Min(1, { message: "orderId deve ser maior que 0" })
    orderId: number;

    @ApiProperty({
        description: "ID do produto",
        example: 3
    })
    @IsNumber({}, { message: "productId deve ser um número" })
    @Min(1, { message: "productId deve ser maior que 0" })
    productId: number;

    @ApiProperty({
        description: "quantity do produto no pedido",
        example: 2
    })
    @IsNumber({}, { message: "quantity deve ser um número" })
    @Min(1, { message: "quantity deve ser pelo menos 1" })
    quantity: number;

    @ApiProperty({
        description: "Preço total do item",
        example: 50.00
    })
    @IsNumber({}, { message: "priceTotal deve ser um número" })
    @Min(0, { message: "Preço não pode ser negativo" })
    priceTotal: number;
}
