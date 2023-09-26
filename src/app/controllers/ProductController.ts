import { type Request, type Response } from "express";

import { productService } from "../services/ProductService";

export const ProductController = {
    async createProduct(req: Request, res: Response) {
        const product = await productService.createProduct(req.body);
        res.json(product);
    },
    async getProductById(req: Request, res: Response) {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    },
    async getAllProducts(req: Request, res: Response) {
        const products = await productService.getAllProducts();
        res.json(products);
    },
    async getAverageProductPrice(req: Request, res: Response) {
        const avgPrice = await productService.getAverageProductPrice();
        res.json({ averagePrice: avgPrice });
    },
};
