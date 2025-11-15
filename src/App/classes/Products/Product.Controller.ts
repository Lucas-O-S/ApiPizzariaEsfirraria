import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./Product.Service";
import { ProductDto } from "./dto/Product.dto";
import { ApiResponseInterface } from "../../Interface/ApiResponseInterface";
import { ProductSchema } from "./Schemas/ProductSchema";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageInterceptorRules } from "src/App/Utils/ImagemFiltters";
import { AdmPermissionGuard } from "src/App/guards/AdmPermission.Guard";
import { JwtAuthGuard } from "src/App/guards/JwtAuth.Guard";

@Controller("product")
@ApiTags("Product")
@UseGuards(JwtAuthGuard, AdmPermissionGuard)
@ApiBearerAuth()
export class ProductController {

    constructor(private readonly service: ProductService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody(ProductSchema)
    @ApiResponse({status: 201, description: "Produto criado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules("productImage"))
    async create(
        @Body() dto: ProductDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ApiResponseInterface> {
        try {
            console.log(file)
            dto.productImage = (file) ? file.buffer : undefined;

            const result = await this.service.create(dto);

            return {
                status: 201,
                message: 'Produto criado com sucesso',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao registrar produto.',
                error: error.message || error,
            };
        }
    }

    @Put(":Id")
    @ApiConsumes('multipart/form-data')
    @ApiBody(ProductSchema)
    @ApiResponse({status: 200, description: "Produto atualizado com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    @UseInterceptors(ImageInterceptorRules("productImage"))
    async update(
        @Param("Id", ParseIntPipe) id: number,
        @Body() dto: ProductDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<ApiResponseInterface> {
        try {
            dto.productImage = file ? Buffer.from(file.buffer) : null;

            const result = await this.service.update(dto, id);

            return {
                status: 200,
                message: 'Produto atualizado com sucesso.',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao atualizar produto.',
                error: error.message || error,
            };
        }
    }

    @Get(":Id")
    @ApiQuery({ name: 'getImage', required: false, type: Boolean, description: 'Se falso, não retorna a imagem, padrão é verdadeiro' })
    @ApiResponse({status: 200, description: "Produto encontrado"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async get(
        @Param("Id", ParseIntPipe) id: number,
        @Query("getImage", new DefaultValuePipe(true), ParseBoolPipe) getImage: boolean
    ): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.get(id, getImage);

            return {
                status: 200,
                message: 'Busca realizada com sucesso.',
                dataUnit: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao buscar produto.',
                error: error.message || error,
            };
        }
    }

    @Get()
    @ApiQuery({ name: 'getImage', required: false, type: Boolean, description: 'Se falso, não retorna a imagem, padrão é falso' })
    @ApiResponse({status: 200, description: "Busca Concluida."})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async getAll(
        @Query("getImage", new DefaultValuePipe(false), ParseBoolPipe) getImage: boolean
    ): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.getAll(getImage);

            return {
                status: 200,
                message: 'Busca concluída.',
                data: result,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao buscar produtos.',
                error: error.message || error,
            };
        }
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "Deleção Concluida"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async delete(
        @Param("id", ParseIntPipe) id: number
    ): Promise<ApiResponseInterface> {
        try {
            const result = await this.service.delete(id);

            return {
                status: 200,
                message: 'Produto deletado com sucesso',
                dataUnit: result
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Erro ao deletar produto.',
                error: error.message || error,
            };
        }
    }
}
