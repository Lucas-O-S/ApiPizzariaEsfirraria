import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, Min, MinLength } from "class-validator";

export class UsuarioDto {

    @ApiProperty({
        description : "nome do usuario",
        example : "Nome1234"
    })
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsString({message: "Deve ser uma string o usuario"})
    name: string;

    @ApiProperty({
        description : "senha do usuario",
        example : "123456789"
    })
    @IsNotEmpty({message: "Senha não pode ser vazio"})
    @IsString({message: "Deve a senha ser uma string"})
    @IsStrongPassword({
        minLength: 2,
        minUppercase: 0,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,    
    }, {message : "deve ter no minimo 2 caracteres a senha"})
    password: string;

}
