import { Injectable } from "@nestjs/common";
import { ProductModel } from "../../Model/Product.Model";
import { InjectModel } from "@nestjs/sequelize";
import { ProductDto } from "./dto/Product.dto";

@Injectable()
export class ProductRepository {

    constructor(@InjectModel(ProductModel) private readonly model: typeof ProductModel) {}

    async create(dto: ProductDto): Promise<ProductModel> {
        const product = await this.model.create(dto);
        return product;
    }

    async update(dto: ProductDto, id: number): Promise<boolean> {
        const [affectedRows] = await this.model.update(dto, { where: { id } });
        return affectedRows > 0;
    }

    async get(id: number, getImage = true): Promise<ProductModel> {
        const attributes = getImage ? undefined : { exclude: ['productImage'] };
        return this.model.findByPk(id, { attributes });
    }

    async getAll(getImage = false): Promise<ProductModel[]> {
        const attributes = getImage ? undefined : { exclude: ['productImage'] };
        return this.model.findAll({ attributes });
    }

    async delete(id: number): Promise<boolean> {
        return (await this.model.destroy({ where: { id } })) > 0;
    }
}
