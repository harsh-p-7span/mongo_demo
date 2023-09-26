import mongoose, { type Document, Schema, type Types } from "mongoose";

// Product Schema
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    categories: Types.ObjectId[];
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

// Category Schema (Self Join for Infinite Categories)
export interface ICategory extends Document {
    name: string;
    parent: Types.ObjectId | null;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
});

export const CategoryModel = mongoose.model<ICategory>(
    "Category",
    CategorySchema
);

// Order Schema (Many-to-Many with Product)
export interface IOrder extends Document {
    products: Array<{
        product: Types.ObjectId;
        priceAtOrderTime: number;
        quantity: number;
    }>;
    totalAmount: number;
    status: string;
}

const OrderSchema = new Schema<IOrder>({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            priceAtOrderTime: { type: Number },
            quantity: { type: Number, default: 1 },
        },
    ],
    totalAmount: { type: Number },
    status: { type: String, default: "pending" },
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

// User Schema
export interface IUser extends Document {
    username: string;
    password: string; // Hashed
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true }, // Ensure to hash before storing
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
