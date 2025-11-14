import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { LoginSchema } from "./Schema/LoginSchema";
import { ApiResponseInterface } from "src/App/Interface/ApiResponseInterface";


@Controller("login")
@ApiTags("Login")
export class AuthController{
    constructor (private readonly service : AuthService ) {}

    @Post()
    @ApiBody(LoginSchema)
    @ApiResponse({status: 200, description: "usuario atualizado com sucesso"})
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
                message: 'Erro ao registrar usuario.',
                error: error.message || error,
            }
        }
    }
}