import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.send("Shopify Phorest Loyalty Sync running");
});

// Shopify webhook endpoint
app.post("/webhook/shopify/order-paid", (req, res) => {
  console.log("Shopify webhook received:");
  console.log(req.body);

  res.status(200).json({ received: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});