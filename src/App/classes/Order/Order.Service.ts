import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./Order.Repository";
import { OrderModel } from "src/App/Model/Order.Model";
import { OrderDto } from "./dto/Order.dto";

@Injectable()
export class OrderService {
    constructor(private readonly repository: OrderRepository) {}

    async create(dto: OrderDto): Promise<OrderModel> {
        if (!dto.items || dto.items.length === 0)
            throw new Error("Um pedido deve ter pelo menos um item");

        return await this.repository.create(dto);
    }

    async update(dto: OrderDto, id: number): Promise<OrderModel> {
        if (!dto.items || dto.items.length === 0)
            throw new Error("Um pedido deve ter pelo menos um item");

        return await this.repository.update(dto, id);
    }

    async get(id: number): Promise<OrderModel> {
        const order = await this.repository.get(id);
        if (!order) throw new Error("Pedido não encontrado");
        return order;
    }

    async getAll(): Promise<OrderModel[]> {
        return await this.repository.getAll();
    }

    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}
