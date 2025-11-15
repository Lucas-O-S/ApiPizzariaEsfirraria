import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { OrderModel } from "./Order.Model";
import { ProductModel } from "./Product.Model";

@Table({
    tableName: "tb_OrderItem",
    timestamps: false
})
export class OrderItemModel extends Model<OrderItemModel> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    orderId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    })
    quantity: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    })
    price: number;

    @BelongsTo(() => OrderModel)
    order: OrderModel;

    @BelongsTo(() => ProductModel)
    product: ProductModel;
}
