import { NovaClient } from "@wandelbots/nova-js/v2";
import { env } from "@/runtimeEnv.ts";

let nova: NovaClient | null = null;

const getSecureUrl = (url: string): string => {
  if (!url) {
    return url;
  }
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : url.includes("wandelbots.io")
      ? `https://${url}`
      : `http://${url}`;
};

export const useNovaClient = () => {
  if (!nova) {
    const secureWandelAPIBaseURL = getSecureUrl(env.WANDELAPI_BASE_URL || "");

    nova = new NovaClient({
      instanceUrl:
        typeof window !== "undefined"
          ? new URL(secureWandelAPIBaseURL || "", window.location.origin).href
          : secureWandelAPIBaseURL || "",
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
