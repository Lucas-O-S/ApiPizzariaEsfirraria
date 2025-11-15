import { Module, forwardRef } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderController } from "./Order.Controller";
import { OrderService } from "./Order.Service";
import { OrderRepository } from "./Order.Repository";
import { OrderModel } from "../../Model/Order.Model";
import { OrderItemModel } from "../../Model/OrderItem.Model";
import { OrderItemModule } from "../OrderItem/OrderItem.Module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        SequelizeModule.forFeature([OrderModel, OrderItemModel]),
        forwardRef(() => OrderItemModule),
        forwardRef(()=> AuthModule)
        
    ],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderService],
})
export class OrderModule {}
