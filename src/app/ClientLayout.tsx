"use client";

import { ThemeProvider } from "@mui/material/styles";
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components";
import { useEffect, useState } from "react";
import { env as runtimeEnv } from "@/runtimeEnv.ts";
import { WandelAppLoader } from "./WandelAppLoader.tsx";

export function ClientLayout({
  env,
  children,
}: Readonly<{
  env: Record<string, string | undefined>;
  children: React.ReactNode;
}>) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    console.log("Received runtime ENV from server:\n  ", env);
    Object.assign(runtimeEnv, env);
    setIsBrowser(true);
  }, [env]);

  const theme = createNovaMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      {isBrowser && <WandelAppLoader>{children}</WandelAppLoader>}
    </ThemeProvider>
  );
}
