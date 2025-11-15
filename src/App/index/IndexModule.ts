import { AuthModule } from "src/auth/auth.module";
import { UsuarioModule } from "../classes/Usuario/Usuario.Module";
import { PreStartModule } from "src/config/PreStart.module";
import { OrderModule } from "../classes/Order/Order.Module";
import { OrderItemModule } from "../classes/OrderItem/OrderItem.Module";
import { ProductModule } from "../classes/Products/Product.Module";


export const AllModules = [
    PreStartModule,
    AuthModule,
    UsuarioModule,
    OrderModule,
    OrderItemModule,
    ProductModule
]