import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OrderModel } from "../../Model/Order.Model";
import { OrderItemModel } from "../../Model/OrderItem.Model";
import { OrderDto } from "./dto/Order.dto";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectModel(OrderModel) private readonly orderModel: typeof OrderModel,
        @InjectModel(OrderItemModel) private readonly orderItemModel: typeof OrderItemModel
    ) {}

    async create(dto: OrderDto) {
        const order = await this.orderModel.create(
            { userId: dto.userId, priceTotal: dto.priceTotal },
            { include: [] }
        );

        const items = dto.items.map(item => ({
            ...item,
            orderId: order.id
        }));

        await this.orderItemModel.bulkCreate(items);

        return this.get(order.id);
    }

    async update(dto: OrderDto, id: number) {
        const order = await this.orderModel.findByPk(id);
        if (!order) throw new Error("Pedido não encontrado");

        await order.update({ userId: dto.userId, priceTotal: dto.priceTotal });

        await this.orderItemModel.destroy({ where: { orderId: id } });

        const items = dto.items.map(item => ({
            ...item,
            orderId: id
        }));

        await this.orderItemModel.bulkCreate(items);

        return this.get(id);
    }

    async get(id: number) {
        return this.orderModel.findByPk(id, {
            include: [{ model: OrderItemModel }]
        });
    }

    async getAll() {
        return this.orderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
    }

    async delete(id: number) {
        await this.orderItemModel.destroy({ where: { orderId: id } });
        return (await this.orderModel.destroy({ where: { id } })) > 0;
    }
}
