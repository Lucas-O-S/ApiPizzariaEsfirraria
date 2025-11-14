import { Injectable } from "@nestjs/common";
import { UsuarioModel } from "../../Model/Usuario.Model";
import { InjectModel } from "@nestjs/sequelize";
import { UsuarioDto } from "./dto/Usuario.dto";
import { where } from "sequelize";


@Injectable()
export class UsuarioRepository {
    
    constructor( @InjectModel(UsuarioModel) private readonly model  : typeof UsuarioModel ){}

    async create(dto : UsuarioDto) : Promise<UsuarioModel>{
        return this.model.create(dto);
    }

    async update(dto : UsuarioDto, id : number) : Promise<boolean>{
        
        const [affectedRows] = await this.model.update(dto, {where: {id: id} });
        return affectedRows > 0;
    }
    
    async get(id : number) : Promise<UsuarioModel>{
        return this.model.findByPk(id);
    }

    async getAll() : Promise<UsuarioModel[]>{
        return this.model.findAll({attributes : {exclude: ['password']}} );
    }

    
    async delete(id : number) : Promise<boolean>{
            
        return (await this.model.destroy({where: {id : id}})) > 0;
    
    }

}