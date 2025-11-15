import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "tb_Product",
    timestamps: false
})
export class ProductModel extends Model<ProductModel> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    })
    id: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    })
    name: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    })
    price: number;
}
