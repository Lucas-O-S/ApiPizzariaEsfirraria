import { forwardRef, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderItemController } from "./OrderItem.Controller";
import { OrderItemService } from "./OrderItem.Service";
import { OrderItemRepository } from "./OrderItem.Repository";
import { OrderItemModel } from "../../Model/OrderItem.Model";
import { ProductModel } from "../../Model/Product.Model";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        SequelizeModule.forFeature([OrderItemModel, ProductModel]),
        forwardRef(()=> AuthModule)
        
    ],
    controllers: [OrderItemController],
    providers: [OrderItemService, OrderItemRepository],
    exports: [OrderItemService],
})
export class OrderItemModule {}
