import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsuarioController } from "./Usuario.Controller";
import { UsuarioService } from "./Usuario.Service";
import { UsuarioRepository } from "./Usuario.Repository";
import { UsuarioModel } from "../../Model/Usuario.Model";
import { AuthModule } from "src/auth/auth.module";



@Module({
    imports: [
        SequelizeModule.forFeature([UsuarioModel]),
        forwardRef(()=> AuthModule)
        
    ],
    controllers: [UsuarioController],
    providers: [UsuarioService, UsuarioRepository],
    exports: [UsuarioService],
})
export class UsuarioModule {}