import { type Request, type Response } from "express";

import { orderService } from "../services/OrderService";

export const OrderController = {
    async createOrder(req: Request, res: Response) {
        const order = await orderService.createOrder(req.body);
        res.json(order);
    },
    async getOrderById(req: Request, res: Response) {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    },
    async getAllOrders(req: Request, res: Response) {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    },
    async getOrderDetails(req: Request, res: Response) {
        const details = await orderService.getOrderDetails();
        res.json(details);
    },
};
