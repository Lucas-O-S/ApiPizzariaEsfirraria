import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsuarioService } from "./Usuario.Service";
import { UsuarioDto } from "./dto/Usuario.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { FileInterceptor} from "@nestjs/platform-express";
import { UsuarioSchema } from "./Schemas/UsuarioSchema";
import { ImageInterceptorRules } from "src/App/Utils/ImagemFiltters";


@Controller("usuario")
@ApiTags("usuario")
export class UsuarioController {

    constructor(private readonly service: UsuarioService) {}

    @Post()
    @ApiBody(UsuarioSchema)
    @ApiResponse({status: 201, description: "usuario criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules)
    async create(
        @Body() dto: UsuarioDto,
    ) : Promise<ApiResponseInterface> {
        try{

            const result = await this.service.create(dto);

            return {
                status: 201,
                message: 'usuario criado com sucesso',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao registrar usuario.',
                error: error.message || error,
            }

        }
    }

    @Put(":Id")
    @ApiBody(UsuarioSchema)
    @ApiResponse({status: 200, description: "usuario atualizado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules)
    async update(
        @Param("Id", ParseIntPipe) id : number,
         @Body() dto: UsuarioDto,
    ) : Promise<ApiResponseInterface> {
        try{
            console.log(dto);

            const result = await this.service.update(dto, id);

            return {
                status: 200,
                message: 'usuario atualizado com sucesso.',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao registrar usuario.',
                error: error.message || error,
            }

        }
    }

    @Get(":Id/")
    @ApiResponse({status: 200, description: "usuario criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async get(
        @Param("Id", ParseIntPipe) id : number,
    ) : Promise<ApiResponseInterface>{
        try{

            const result = await this.service.get(id);

            return {
                status: 200,
                message: 'Busca realizada com sucesso.',
                dataUnit: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao buscar usuario.',
                error: error.message || error,
            }

        }
    }

    @Get()
    @ApiResponse({status: 200, description: "Busca Concluida."})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async getAll() : Promise<ApiResponseInterface> {
        try{

            const result = await this.service.getAll();

            return {
                status: 200,
                message: 'Busca Concluida.',
                data: result,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao buscar usuario.',
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
                message: 'usuario deletado com sucesso',
                dataUnit: result
            }

        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao deletar usuario.',
                error: error.message || error,
            }

        }


    }
}