import { BelongsTo, Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
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

    @ForeignKey(() => OrderModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    orderId: number;

    @ForeignKey(() => ProductModel)
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
        field: 'priceTotal',
        validate: {
            min: 0
        }
    })
    priceTotal: number;

    @BelongsTo(() => OrderModel, { foreignKey: 'orderId' })
    order: OrderModel;

    @BelongsTo(() => ProductModel, { foreignKey: 'productId' })
    product: ProductModel;
}
