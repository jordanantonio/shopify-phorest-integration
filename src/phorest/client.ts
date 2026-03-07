import { config } from "../config/index.js";
import type { PhorestClientSearchResponse } from "../types/phorest.js";

type PhorestClient = PhorestClientSearchResponse["_embedded"]["clients"][number];

export class PhorestApiClient {
  private getAuthHeader(): string {
    const credentials = `${config.PHOREST_USERNAME}:${config.PHOREST_PASSWORD}`;
    const encoded = Buffer.from(credentials).toString("base64");
    return `Basic ${encoded}`;
  }

  async getClientByEmail(email: string): Promise<PhorestClient | null> {
    const response = await fetch(
      `${config.PHOREST_API_BASE_URL}/business/${config.PHOREST_BUSINESS_ID}/client?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: this.getAuthHeader(),
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as PhorestClientSearchResponse;
    const clients = data._embedded?.clients;

    if (clients && clients.length > 0) {
      const [firstClient] = clients;
      return firstClient ?? null;
    }

    return null;
  }

  async updateClientPoints(
    clientId: string,
    pointsTemplate: { loyaltyPoints: number },
  ): Promise<void> {
    const response = await fetch(
      `${config.PHOREST_API_BASE_URL}/business/${config.PHOREST_BUSINESS_ID}/client/${clientId}`,
      {
        method: "PUT",
        headers: {
          Authorization: this.getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pointsTemplate),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to update client points: ${response.status}`);
    }
  }
}
