import { type IOrder, OrderModel, ProductModel } from "../models";

class OrderService {
    async createOrder(orderData: IOrder): Promise<IOrder> {
        const productIds = orderData.products.map((p) => p.product);
        const currentPrices = await ProductModel.find({
            _id: { $in: productIds },
        }).exec();

        const updatedProducts = orderData.products.map((p) => {
            const product = currentPrices.find(
                (cp) => cp._id.toString() === p.product.toString()
            );
            return {
                product: p.product,
                priceAtOrderTime: product ? product.price : 0,
                quantity: p.quantity,
            };
        });

        const totalAmount = updatedProducts.reduce(
            (total, p) => total + p.priceAtOrderTime * p.quantity,
            0
        );

        const order = new OrderModel({
            ...orderData,
            products: updatedProducts,
            totalAmount,
        });

        return await order.save();
    }

    async getOrderById(id: string): Promise<IOrder | null> {
        return await OrderModel.findById(id).exec();
    }

    async getAllOrders(): Promise<IOrder[]> {
        return await OrderModel.find().exec();
    }

    async getOrderDetails(): Promise<any> {
        const pipeline = [
            {
                $match: {
                    status: "active",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$user",
                    products: {
                        $push: "$products.product",
                    },
                    totalOrderAmount: {
                        $sum: "$totalAmount",
                    },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
        ];

        return await OrderModel.aggregate(pipeline).exec();
    }
}

export const orderService = new OrderService();
