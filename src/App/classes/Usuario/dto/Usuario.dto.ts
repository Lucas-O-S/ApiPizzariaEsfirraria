import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioDto {

    @ApiProperty()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsString({message: "Deve ser uma string"})
    nome: string;

    @ApiProperty()
    @IsNotEmpty({message: "RA não pode ser vazio"})
    @IsString({message: "Deve ser uma string"})
    ra: string;

    @ApiProperty()
    imagem: Buffer;

}
