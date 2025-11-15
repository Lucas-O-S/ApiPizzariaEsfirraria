import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";
import * as bcrypt from "bcrypt";

@Table({
    tableName: "tb_Usuario",
    timestamps: false
})
export class UsuarioModel extends Model<UsuarioModel>{
    
    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    })
    id:number;


    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name : string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        validate : {
            notEmpty : true,
            len : [0,255]
        },
        set (value : string) {
            const hashed = bcrypt.hashSync(value, 10);
            this.setDataValue("password", hashed);
        }

    })
    password : string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 2
    })
    roleId: number;

}