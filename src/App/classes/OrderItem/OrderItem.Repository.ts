// OrderItemRepository.ts
import { Injectable } from "@nestjs/common";
import { OrderItemModel } from "../../Model/OrderItem.Model";
import { InjectModel } from "@nestjs/sequelize";
import { OrderItemDto } from "./dto/OrderItem.dto";

@Injectable()
export class OrderItemRepository {

    constructor(@InjectModel(OrderItemModel) private readonly model: typeof OrderItemModel) {}

    async create(dto: OrderItemDto): Promise<OrderItemModel> {
        return this.model.create(dto);
    }

    async update(dto: OrderItemDto, id: number): Promise<boolean> {
        const [affectedRows] = await this.model.update(dto, { where: { id } });
        return affectedRows > 0;
    }

    async get(id: number): Promise<OrderItemModel> {
        return this.model.findByPk(id);
    }

    async getAll(): Promise<OrderItemModel[]> {
        return this.model.findAll();
    }

    async delete(id: number): Promise<boolean> {
        return (await this.model.destroy({ where: { id } })) > 0;
    }
}
