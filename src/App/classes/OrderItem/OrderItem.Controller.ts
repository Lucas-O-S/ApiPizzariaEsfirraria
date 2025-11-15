import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderItemService } from "./OrderItem.Service";
import { OrderItemDto } from "./dto/OrderItem.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { JwtAuthGuard } from "src/App/guards/JwtAuth.Guard";
import { OrderItemSchema } from "./Schemas/OrderItemSchema";

@Controller("order-item")
@ApiTags("OrderItem")
//@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderItemController {

    constructor(private readonly service: OrderItemService) {}

    @Post()
    @ApiBody( OrderItemSchema )
    @ApiResponse({status: 201, description: "Item do pedido criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async create(@Body() dto: OrderItemDto): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 201,
                message: 'Item do pedido criado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao criar item do pedido',
                error: error.message || error,
            };
        }
    }

    @Put(":id")
    @ApiBody( OrderItemSchema )
    @ApiResponse({status: 200, description: "Item do pedido atualizado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: OrderItemDto): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.update(dto, id);
            return {
                status: 200,
                message: 'Item do pedido atualizado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao atualizar item do pedido',
                error: error.message || error,
            };
        }
    }

    @Get(":id")
    @ApiResponse({status: 200, description: "Item do pedido buscado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async get(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.get(id);
            return {
                status: 200,
                message: 'Item do pedido buscado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao buscar item do pedido',
                error: error.message || error,
            };
        }
    }

    @Get()
    @ApiResponse({status: 200, description: "Busca concluída"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async getAll(): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.getAll();
            return {
                status: 200,
                message: 'Busca concluída',
                data: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao buscar itens do pedido',
                error: error.message || error,
            };
        }
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "Item do pedido deletado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async delete(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.delete(id);
            return {
                status: 200,
                message: 'Item do pedido deletado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao deletar item do pedido',
                error: error.message || error,
            };
        }
    }
}
