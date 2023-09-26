import { Router } from "express";

import { Controller } from "../controllers";
import { CategoryController } from "../controllers/CategoryController";
import { OrderController } from "../controllers/OrderController";
import { ProductController } from "../controllers/ProductController";

const router = Router();

// Product Routes
router.post("/products", ProductController.createProduct);
router.get("/products/average-price", ProductController.getAverageProductPrice);
router.get("/products/:id", ProductController.getProductById);
router.get("/products", ProductController.getAllProducts);

// Order Routes
router.post("/orders", OrderController.createOrder);
router.get("/orders/details", OrderController.getOrderDetails);
router.get("/orders/:id", OrderController.getOrderById);
router.get("/orders", OrderController.getAllOrders);

// Category Routes
router.post("/categories", CategoryController.createCategory);
router.get("/categories/nested/:id", CategoryController.getNestedCategories);
router.get("/categories/:id", CategoryController.getCategoryById);
router.get("/categories", CategoryController.getAllCategories);

router.get("/clean-database", Controller.cleanDatabase);

export default router;
