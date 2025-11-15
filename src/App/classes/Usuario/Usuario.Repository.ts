import { Injectable } from "@nestjs/common";
import { UsuarioModel } from "../../Model/Usuario.Model";
import { InjectModel } from "@nestjs/sequelize";
import { UsuarioDto } from "./dto/Usuario.dto";
import { where } from "sequelize";
import { LoginDto } from "src/auth/dto/login.dto";


@Injectable()
export class UsuarioRepository {
    
    constructor( @InjectModel(UsuarioModel) private readonly model  : typeof UsuarioModel ){}

    async create(dto : UsuarioDto) : Promise<UsuarioModel>{
        const user = await this.model.create(dto);
        user.setDataValue("password", undefined);
        return user;
    }

    async update(dto : UsuarioDto, id : number) : Promise<boolean>{
        
        const [affectedRows] = await this.model.update(dto, {where: {id: id} });
        return affectedRows > 0;
    }
    
    async get(id : number) : Promise<UsuarioModel>{
        return this.model.findByPk(id, {attributes : {exclude: ['password']}});
    }

    async getAll() : Promise<UsuarioModel[]>{
        return this.model.findAll({attributes : {exclude: ['password']}} );
    }

    
    async delete(id : number) : Promise<boolean>{
            
        return (await this.model.destroy({where: {id : id}})) > 0;
    
    }

    async verifyLogin(dto : LoginDto) : Promise<UsuarioModel>{
        return await this.model.findOne({
            where : {
                name : dto.name,
            }
        })
    }

    async verifyAdm (id : number) : Promise<boolean>{
        return ((await this.model.findByPk(id)).roleId) == 1 
    }

    async verifyFirstAdmExistence () {
        
        const admin = await this.model.findOne({ where: { name: 'ADM', id : 1 }});

        if (!admin) {
           
            await this.model.create({
                name: "ADM",
                password: "123456",
                roleId: 1,
            });
        
        }
    }

}