import crypto from "crypto";
import type { NextFunction, Request, Response } from "express";

type ShopifyWebhookRequest = Request & { rawBody?: Buffer };

export function verifyShopifyWebhook(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const hmacHeader = req.get("X-Shopify-Hmac-Sha256");
  const { rawBody } = req as ShopifyWebhookRequest;

  if (!secret) {
    res.status(500).json({ error: "Missing SHOPIFY_WEBHOOK_SECRET" });
    return;
  }

  if (!hmacHeader || !rawBody) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");

  const calculated = Buffer.from(digest, "base64");
  const provided = Buffer.from(hmacHeader, "base64");

  if (
    calculated.length !== provided.length ||
    !crypto.timingSafeEqual(calculated, provided)
  ) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }

  next();
}
