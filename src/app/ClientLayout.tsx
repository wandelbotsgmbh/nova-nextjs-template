"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNovaMuiTheme } from "@wandelbots/wandelbots-js-react-components/core";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen.tsx";
import { env as runtimeEnv } from "@/runtimeEnv.ts";

let envAssigned = false;
const queryClient = new QueryClient();

export function ClientLayout({
  env,
  children,
}: Readonly<{
  env: Record<string, string | undefined>;
  children: React.ReactNode;
}>) {
  if (!envAssigned) {
    console.log("Runtime ENV from server:\n  ", env);
    Object.assign(runtimeEnv, env);
    envAssigned = true;
  }

  const theme = createNovaMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
