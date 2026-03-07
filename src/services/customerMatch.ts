import { PhorestApiClient } from "../phorest/client.js";
import type { PhorestClient } from "../types/phorest.js";

export async function findPhorestClient(
  email: string | undefined,
): Promise<PhorestClient | null> {
  if (!email || email.trim() === "") {
    return null;
  }

  const phorestClient = new PhorestApiClient();
  const client = await phorestClient.getClientByEmail(email);
  return client;
}
