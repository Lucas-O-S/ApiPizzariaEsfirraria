// OrderItemService.ts
import { Injectable } from "@nestjs/common";
import { OrderItemDto } from "./dto/OrderItem.dto";
import { OrderItemRepository } from "./OrderItem.Repository";
import { OrderItemModel } from "src/App/Model/OrderItem.Model";

@Injectable()
export class OrderItemService {

    constructor(private readonly repository: OrderItemRepository) {}

    async create(dto: OrderItemDto): Promise<OrderItemModel> {
        return await this.repository.create(dto);
    }

    async update(dto: OrderItemDto, id: number): Promise<boolean> {
        return await this.repository.update(dto, id);
    }

    async get(id: number): Promise<OrderItemModel> {
        const item = await this.repository.get(id);
        if (!item) throw new Error("Item não encontrado");
        return item;
    }

    async getAll(): Promise<OrderItemModel[]> {
        return await this.repository.getAll();
    }

    async delete(id: number): Promise<boolean> {
        if (!(await this.repository.get(id))) throw new Error("Não existe este registro no banco");
        return await this.repository.delete(id);
    }
}
