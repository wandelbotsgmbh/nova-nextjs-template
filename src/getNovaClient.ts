import { NovaClient } from "@wandelbots/nova-js/v2";
import { env } from "./runtimeEnv.ts";

let nova: NovaClient | null = null;

const standardizeUrl = (url: string): string => {
  if (!url) {
    return url;
  }
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : url.includes("wandelbots.io")
      ? `https://${url}`
      : `http://${url}`;
};

export const getNovaClient = () => {
  if (!nova) {
    const baseUrl = standardizeUrl(env.WANDELAPI_BASE_URL || "");

    nova = new NovaClient({
      instanceUrl:
        typeof window !== "undefined"
          ? new URL(baseUrl || "", window.location.origin).href
          : baseUrl || "",
      cellId: env.CELL_ID || "cell",
      accessToken: env.NOVA_ACCESS_TOKEN || "",
      baseOptions: {
        // Time out after 30 seconds
        timeout: 30000,
      },
    });
  }

  return nova;
};
