import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductController } from "./Product.Controller";
import { ProductService } from "./Product.Service";
import { ProductRepository } from "./Product.Repository";
import { ProductModel } from "../../Model/Product.Model";
import { AuthModule } from "src/auth/auth.module";
import { UsuarioModule } from "../Usuario/Usuario.Module";

@Module({
    imports: [
        SequelizeModule.forFeature([ProductModel]),
        forwardRef(()=> AuthModule),
        forwardRef(() => UsuarioModule)
        
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService],
})
export class ProductModule {}
