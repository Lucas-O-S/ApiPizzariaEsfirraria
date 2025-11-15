import { Injectable } from "@nestjs/common";
import { UsuarioDto } from "./dto/Usuario.dto";
import { UsuarioRepository } from "./Usuario.Repository";
import { UsuarioModel } from "src/App/Model/Usuario.Model";
import { LoginDto } from "src/auth/dto/login.dto";


@Injectable()
export class UsuarioService {

    constructor( private readonly repository : UsuarioRepository ){}

    async create(model : UsuarioDto) : Promise<UsuarioModel>{


        return await this.repository.create(model);
        
    }

    async update(model : UsuarioDto, id : number) : Promise<boolean>{
        

        return await this.repository.update(model, id);
        
    }

    async get(id : number) : Promise<UsuarioModel>{
        
        
        const user = await this.repository.get(id);

        if (!user) throw new Error("Usuario não encontrado");

        return user

    }
    async getAll() : Promise<UsuarioModel[]>{
        

        return await this.repository.getAll();
        
    }

    async delete(id : number) : Promise<Boolean>{
        
        if (!(await this.repository.get(id))) throw new Error("Não existe este registro no banco");
        
        return await this.repository.delete(id);
    }

    async verifyLogin(dto : LoginDto) : Promise<UsuarioModel>{
        
        const user = await this.repository.verifyLogin(dto);
        
        if (!user) throw new Error("Erro, usuario não encontrado");
        
        return user;
    }

    async verifyAdm (id : number) : Promise<boolean>{
        return await this.repository.verifyAdm(id)
    }

    async verifyFirstAdmExistence () {
        await this.repository.verifyFirstAdmExistence();
    }



}