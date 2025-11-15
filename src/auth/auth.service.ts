import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from 'src/App/classes/Usuario/Usuario.Service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService : UsuarioService
    ) {}

    public async login(dto: LoginDto) {
        
        const user = await this.userService.verifyLogin(dto);
        
        const validPassword = await bcrypt.compare(dto.password, user.password)

        if(!validPassword) 
            throw new Error("Senha Incorreta!")

        const payload = { username: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
