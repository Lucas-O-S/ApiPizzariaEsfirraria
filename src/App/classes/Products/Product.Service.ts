import { Injectable } from "@nestjs/common";
import { ProductDto } from "./dto/Product.dto";
import { ProductRepository } from "./Product.Repository";
import { ProductModel } from "src/App/Model/Product.Model";

@Injectable()
export class ProductService {

    constructor(private readonly repository: ProductRepository) {}

    async create(dto: ProductDto): Promise<ProductModel> {
        return this.repository.create(dto);
    }

    async update(dto: ProductDto, id: number): Promise<boolean> {
        return this.repository.update(dto, id);
    }

    async get(id: number, getImage = true): Promise<ProductModel> {
        const product = await this.repository.get(id, getImage);
        if (!product) throw new Error("Produto não encontrado");
        return product;
    }

    async getAll(getImage = false): Promise<ProductModel[]> {
        return this.repository.getAll(getImage);
    }

    async delete(id: number): Promise<boolean> {
        const exists = await this.repository.get(id);
        if (!exists) throw new Error("Produto não encontrado");
        return this.repository.delete(id);
    }
}
