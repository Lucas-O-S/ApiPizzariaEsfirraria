import { AuthModule } from "src/auth/auth.module";
import { UsuarioModule } from "../classes/Usuario/Usuario.Module";
import { PreStartModule } from "src/config/PreStart.module";


export const AllModules = [
    PreStartModule,
    AuthModule,
    UsuarioModule
]