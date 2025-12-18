"use client";

import { NoMotionGroupModal } from "@wandelbots/wandelbots-js-react-components";
import { useAvailableControllers } from "@/hooks/useAvailableControllers.ts";
import { env } from "@/runtimeEnv.ts";
import { WandelAppPlaceholder } from "@/templates/Placeholder/WandelAppPlaceholder.tsx";
import { LoadingScreen } from "../components/LoadingScreen.tsx";

export const WandelAppMain = () => {
  // Find controllers available on the NOVA OS instance
  const { controllers, error } = useAvailableControllers();

  if (!controllers) {
    return (
      <LoadingScreen message="Loading robot controllers..." error={error} />
    );
  }

  const controller = controllers[0];

  if (!controller) {
    return <NoMotionGroupModal baseUrl={env.WANDELAPI_BASE_URL || ""} />;
  }

  return (
    <>
      {/* add your code here */}
      <WandelAppPlaceholder controller={controller} />
    </>
  );
};
