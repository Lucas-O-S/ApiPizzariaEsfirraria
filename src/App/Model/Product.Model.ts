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
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    description: string; // <-- adicionado

    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false
    })
    price: number;

    @Column({
        type: DataType.BLOB("long"),
        allowNull: true
    })
    productImage?: Buffer;
}
