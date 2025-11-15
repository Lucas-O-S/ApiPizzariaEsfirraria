import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { LoginSchema } from "./Schema/LoginSchema";
import { ApiResponseInterface } from "src/App/Interface/ApiResponseInterface";
import { JwtAuthGuard } from "src/App/guards/JwtAuth.Guard";


@Controller("auth")
@ApiTags("Auth")
export class AuthController{
    constructor (private readonly service : AuthService ) {}

    @Post("login")
    @ApiBody(LoginSchema)
    @ApiResponse({status: 200, description: "login feito com sucesso"})
    @ApiResponse({status: 500, description: "Erro na requisição"})
    async login(@Body() dto : LoginDto) : Promise<ApiResponseInterface>{
        try{
            const token = await this.service.login(dto);
            return {
                status: 200,
                message: 'login feito com sucesso.',
                dataUnit: token,
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao fazer login de usuario.',
                error: error.message || error,
            }
        }
    }

    @Get("retrieve-user")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({status: 200, description: "User retrieved successfully"})
    @ApiResponse({status: 401, description: "Unauthorized"})
    async retrieveUser(@Request() req) : Promise<ApiResponseInterface>{
        try{
            const { id, name } = req.user;
            return {
                status: 200,
                message: 'User retrieved successfully.',
                dataUnit: { id, name },
            } ;
        }
        catch(error){
            return{
                status: 500,
                message: 'Erro ao recuperar usuario.',
                error: error.message || error,
            }
        }
    }
}
