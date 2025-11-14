import { Injectable } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { UsuarioRepository } from "./Usuario.Repository";
import { UsuarioModel } from "src/App/Model/Usuario.Model";


@Injectable()
export class UsuarioService {

    constructor( private readonly repository : UsuarioRepository ){}

    async create(model : UsuarioDto) : Promise<UsuarioModel>{


        return await this.repository.create(model);
        
    }

    async update(model : UsuarioDto, id : number) : Promise<boolean>{
        

        return await this.repository.update(model, id);
        
    }

    async get(id : number, getImage: boolean = true) : Promise<UsuarioModel>{
        
        
        return (getImage) ? await this.repository.get(id) : await this.repository.getNoImage(id);
        
    }
    async getAll( getImage: boolean = false) : Promise<UsuarioModel[]>{
        

        return (getImage) ? await this.repository.getAll() : await this.repository.getAllNoImage();
        
    }

    public async delete(id : number) : Promise<Boolean>{
        
        if (!(await this.repository.get(id))) throw new Error("Não existe este registro no banco");
        
        return await this.repository.delete(id);
    }

}