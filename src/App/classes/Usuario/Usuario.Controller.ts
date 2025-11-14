import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./Usuario.Service";
import { UsuarioDto } from "./dto/Usuario.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { FileInterceptor} from "@nestjs/platform-express";
import { UsuarioSchema } from "./Schemas/UsuarioSchema";
import { ImageInterceptorRules } from "src/App/Utils/ImagemFiltters";


@Controller("aluno")
@ApiTags("Aluno")
export class UsuarioController {

    constructor(private readonly service: UsuarioService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody(UsuarioSchema)
    @ApiResponse({status: 201, description: "Aluno criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules)
    async create(
        @Body() dto: UsuarioDto,
        @UploadedFile() file: Express.Multer.File
    ) : Promise<ApiResponseInterface> {
        try{

            if (file) dto.imagem = file.buffer;
            
            else throw new Error("Imagem é obrigatória");

            const result = await this.service.create(dto);

            return {
                status: 201,
                message: 'Aluno criado com sucesso',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao registrar aluno.',
                error: error.message || error,
            }

        }
    }

    @Put(":Id")
    @ApiConsumes('multipart/form-data')
    @ApiBody(UsuarioSchema)
    @ApiResponse({status: 200, description: "Aluno atualizado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules)
    async update(
        @Param("Id", ParseIntPipe) id : number,
         @Body() dto: UsuarioDto,
        @UploadedFile() file: Express.Multer.File
    ) : Promise<ApiResponseInterface> {
        try{
            console.log(dto);
            if (file) dto.imagem = file.buffer;
            else throw new Error("Imagem é obrigatória");

            const result = await this.service.update(dto, id);

            return {
                status: 200,
                message: 'Aluno atualizado com sucesso.',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao registrar aluno.',
                error: error.message || error,
            }

        }
    }

    @Get(":Id/")
    @ApiQuery({ name: 'BuscaImagem', required: false, type: Boolean, description: 'Se falso, não retorna a imagem, padrão é verdadeiro' })
    @ApiResponse({status: 200, description: "Aluno criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async get(
        @Param("Id", ParseIntPipe) id : number,
        @Query("BuscaImagem", new DefaultValuePipe(true), ParseBoolPipe) getImage : boolean
    ) : Promise<ApiResponseInterface>{
        try{

            const result = await this.service.get(id, getImage);

            return {
                status: 200,
                message: 'Busca realizada com sucesso.',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao buscar aluno.',
                error: error.message || error,
            }

        }
    }

    @Get()
    @ApiQuery({ name: 'BuscaImagem', required: false, type: Boolean, description: 'Se falso, não retorna a imagem, padrão é falso' })
    @ApiResponse({status: 200, description: "Busca Concluida."})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async getAll(
        @Query("BuscaImagem", new DefaultValuePipe(false), ParseBoolPipe) getImage : boolean
    ) : Promise<ApiResponseInterface> {
        try{

            const result = await this.service.getAll(getImage);

            return {
                status: 200,
                message: 'Busca Concluida.',
                data: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao buscar aluno.',
                error: error.message || error,
            }

        }
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "Deleção Concluida"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async delete(
        @Param("id", ParseIntPipe) id : number
    ) : Promise<ApiResponseInterface>{

        try{

            const result = await this.service.delete(id);

            return {
                status: 200,
                message: 'Aluno deletado com sucesso',
                dataUnit: result
            }

        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao deletar aluno.',
                error: error.message || error,
            }

        }


    }
}