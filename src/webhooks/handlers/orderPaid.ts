import type { Request, Response } from "express";
import { PhorestApiClient } from "../../phorest/client.js";
import { findPhorestClient } from "../../services/customerMatch.js";
import { calculateLoyaltyPoints } from "../../services/pointsCalculator.js";
import { logger } from "../../utils/logger.js";

export async function handleOrderPaid(req: Request, res: Response) {
  try {
    const { email, subtotal } = req.body as {
      email?: string;
      subtotal?: number | string;
    };

    if (!email || subtotal === undefined || subtotal === null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const client = await findPhorestClient(email);

    if (!client) {
      logger.info(`No matching Phorest client for email: ${email}`);
      return res.status(200).json({ message: "No matching Phorest client" });
    }

    const points = calculateLoyaltyPoints(subtotal);

    if (points > 0) {
      const phorestClient = new PhorestApiClient();
      await phorestClient.updateClientPoints(client.clientId, {
        loyaltyPoints: client.loyaltyPoints + points,
      });
    }

    return res.status(200).json({ message: "Order processed successfully" });
  } catch (error) {
    logger.error({ err: error }, "Error handling Shopify order-paid webhook");
    return res.status(500).json({ error: "Internal server error" });
  }
}
