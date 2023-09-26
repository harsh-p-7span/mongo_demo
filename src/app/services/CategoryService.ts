import mongoose from "mongoose";

import { CategoryModel, type ICategory } from "../models";

class CategoryService {
    async createCategory(categoryData: ICategory): Promise<ICategory> {
        const category = new CategoryModel(categoryData);
        return await category.save();
    }

    async getCategoryById(id: string): Promise<ICategory | null> {
        return await CategoryModel.findById(id).exec();
    }

    async getAllCategories(): Promise<ICategory[]> {
        return await CategoryModel.find().exec();
    }

    async getNestedCategories(startWithId: string): Promise<any> {
        return await CategoryModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(startWithId) },
            },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parent",
                    as: "children",
                },
            },
        ]).exec();
    }
}

export const categoryService = new CategoryService();
