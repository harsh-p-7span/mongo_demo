import { type IProduct, ProductModel } from "../models";

class ProductService {
    async createProduct(productData: IProduct): Promise<IProduct> {
        const product = new ProductModel(productData);
        return await product.save();
    }

    async getProductById(id: string): Promise<IProduct | null> {
        return await ProductModel.findById(id).exec();
    }

    async getAllProducts(): Promise<IProduct[]> {
        return await ProductModel.find().exec();
    }

    async getAverageProductPrice(): Promise<number> {
        const result = await ProductModel.aggregate([
            {
                $group: {
                    _id: null,
                    avgPrice: {
                        $avg: "$price",
                    },
                },
            },
        ]).exec();

        return result[0].avgPrice ?? 0;
    }
}

export const productService = new ProductService();
