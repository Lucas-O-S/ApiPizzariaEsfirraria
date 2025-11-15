import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsuarioService } from "../classes/Usuario/Usuario.Service";


@Injectable()
export class AdmPermissionGuard implements CanActivate{

    constructor (
        private readonly jwtService : JwtService,
        private readonly  usuarioService : UsuarioService  
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;

        if(!authHeader)
            throw new ForbiddenException('Token não enviado.');
        
        const token = authHeader.split(' ')[1];

        let decoded;

        try {
            decoded = this.jwtService.verify(token);
        }
         catch (err) {
            throw new ForbiddenException('Token inválido ou expirado.');
        }
        const userIdFromToken = decoded.sub;

        const isAdm = await this.usuarioService.verifyAdm(userIdFromToken);

        if (!isAdm)
            throw new ForbiddenException(
                'Você não tem permissão para acessar este recurso.',
        );

        return true;
    

    }

}