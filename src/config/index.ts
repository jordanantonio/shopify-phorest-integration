const requiredEnvVars = {
  PHOREST_BUSINESS_ID: process.env.PHOREST_BUSINESS_ID,
  PHOREST_USERNAME: process.env.PHOREST_USERNAME,
  PHOREST_PASSWORD: process.env.PHOREST_PASSWORD,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const config = {
  PHOREST_BUSINESS_ID: requiredEnvVars.PHOREST_BUSINESS_ID,
  PHOREST_USERNAME: requiredEnvVars.PHOREST_USERNAME,
  PHOREST_PASSWORD: requiredEnvVars.PHOREST_PASSWORD,
  PHOREST_API_BASE_URL:
    process.env.PHOREST_API_BASE_URL ??
    "https://api-us.phorest.com/publishing/v1/api",
};
