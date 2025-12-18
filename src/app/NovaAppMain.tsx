"use client";

import { NoMotionGroupModal } from "@wandelbots/wandelbots-js-react-components/core";
import { useAvailableControllers } from "@/hooks/useAvailableControllers.ts";
import { env } from "@/runtimeEnv.ts";
import { NovaAppPlaceholder } from "@/templates/Placeholder/NovaAppPlaceholder.tsx";

export const NovaAppMain = () => {
  // Find controllers available on the NOVA OS instance
  const { controllers } = useAvailableControllers();

  const controller = controllers[0];

  if (!controller) {
    return <NoMotionGroupModal baseUrl={env.NOVA_DEV_INSTANCE_URL || ""} />;
  }

  return (
    <>
      {/* add your code here */}
      <NovaAppPlaceholder controller={controller} />
    </>
  );
};
