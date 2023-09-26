import { type Request, type Response } from "express";

import { categoryService } from "../services/CategoryService";

export const CategoryController = {
    async createCategory(req: Request, res: Response) {
        const category = await categoryService.createCategory(req.body);
        res.json(category);
    },
    async getCategoryById(req: Request, res: Response) {
        const category = await categoryService.getCategoryById(req.params.id);
        res.json(category);
    },
    async getAllCategories(req: Request, res: Response) {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    },
    async getNestedCategories(req: Request, res: Response) {
        const nestedCategories = await categoryService.getNestedCategories(
            req.params.id
        );
        res.json(nestedCategories);
    },
};
