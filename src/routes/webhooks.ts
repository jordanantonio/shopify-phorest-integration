import { Router } from "express";
import { handleOrderPaid } from "../webhooks/handlers/orderPaid.js";
import { verifyShopifyWebhook } from "../webhooks/verifyShopify.js";

const webhookRouter = Router();

webhookRouter.post("/shopify/order-paid", verifyShopifyWebhook, handleOrderPaid);

export { webhookRouter };
