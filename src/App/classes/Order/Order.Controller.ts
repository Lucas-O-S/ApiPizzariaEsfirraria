import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderService } from "./Order.Service";
import { OrderDto } from "./dto/Order.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { JwtAuthGuard } from "src/App/guards/JwtAuth.Guard";
import { OrderSchema } from "./Schemas/OrderSchema";

@Controller("order")
@ApiTags("Order")
//@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {

    constructor(private readonly service: OrderService) {}

    @Post()
    @ApiBody( OrderSchema )
    @ApiResponse({status: 201, description: "Pedido criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async create(@Body() dto: OrderDto): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 201,
                message: 'Pedido criado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao criar pedido',
                error: error.message || error,
            };
        }
    }

    @Put(":id")
    @ApiBody( OrderSchema )
    @ApiResponse({status: 200, description: "Pedido atualizado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: OrderDto): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.update(dto, id);
            return {
                status: 200,
                message: 'Pedido atualizado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao atualizar pedido',
                error: error.message || error,
            };
        }
    }

    @Get(":id")
    @ApiResponse({status: 200, description: "Pedido buscado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async get(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.get(id);
            return {
                status: 200,
                message: 'Pedido buscado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao buscar pedido',
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
                message: 'Erro ao buscar pedidos',
                error: error.message || error,
            };
        }
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "Pedido deletado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async delete(@Param("id", ParseIntPipe) id: number): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.delete(id);
            return {
                status: 200,
                message: 'Pedido deletado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao deletar pedido',
                error: error.message || error,
            };
        }
    }
}
