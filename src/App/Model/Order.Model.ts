import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { OrderItemModel } from "./OrderItem.Model";

@Table({
    tableName: "tb_Order",
    timestamps: false
})
export class OrderModel extends Model<OrderModel> {

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
    userId: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    })
    priceTotal: number;

    
    @HasMany(() => OrderItemModel)
    items: OrderItemModel[];
}
