import express, { type Request } from "express";
import { webhookRouter } from "./routes/webhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as Request & { rawBody?: Buffer }).rawBody = Buffer.from(buf);
    },
  }),
);

// Health check route
app.get("/", (_req, res) => {
  res.send("Shopify Phorest Loyalty Sync running");
});

app.use("/webhooks", webhookRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
