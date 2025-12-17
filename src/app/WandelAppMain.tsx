"use client";

import { NoMotionGroupModal } from "@wandelbots/wandelbots-js-react-components";
import { observer } from "mobx-react-lite";
import { env } from "@/runtimeEnv.ts";
import { WandelAppPlaceholder } from "@/templates/Placeholder/WandelAppPlaceholder.tsx";
import { useWandelApp } from "@/WandelAppContext.ts";
import { LoadingScreen } from "./LoadingScreen.tsx";

export const WandelAppMain = observer(() => {
  const wandelApp = useWandelApp();

  if (!wandelApp.motionGroupOptions.length) {
    // No robots (virtual or otherwise)! We can't do much without a robot.
    return <NoMotionGroupModal baseUrl={env.WANDELAPI_BASE_URL || ""} />;
  }

  // Everything below this point expects an active robot
  if (!wandelApp.activeRobot) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* add your code here */}
      <WandelAppPlaceholder />
    </>
  );
});
