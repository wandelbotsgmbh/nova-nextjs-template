"use client";

import { observer, useLocalObservable } from "mobx-react-lite";
import { type ReactNode, useEffect } from "react";
import { getNovaClient } from "@/getWandelApi.ts";
import { WandelApp } from "@/WandelApp.ts";
import { WandelAppContext } from "@/WandelAppContext.ts";
import { LoadingScreen } from "./LoadingScreen.tsx";

export const WandelAppLoader = observer((props: { children: ReactNode }) => {
  const nova = getNovaClient();

  const state = useLocalObservable(() => ({
    loading: "Initializing" as string | null,
    error: null as unknown | null,
    wandelApp: null as WandelApp | null,

    finishLoading() {
      state.loading = null;
    },

    nowLoading(message: string) {
      state.loading = message;
    },

    receiveError(error: unknown) {
      console.error(error);
      state.error = error;
    },
  }));

  async function loadWandelApp() {
    state.nowLoading(`Loading controllers`);

    let controllersRes;
    try {
      controllersRes = await nova.api.controller.listControllers();
    } catch (error) {
      console.error("Error: No connection to WandelAPI", error);
    }

    const availableControllers = controllersRes?.instances || [];

    console.log(`Available controllers:\n  `, availableControllers);

    state.wandelApp = new WandelApp(nova, availableControllers);

    if (!state.wandelApp.selectedMotionGroupId) {
      // No saved motion group, try to select the first available
      const motionGroup = state.wandelApp.motionGroupOptions[0];
      if (motionGroup) {
        state.nowLoading(`Configuring motion group`);
        await state.wandelApp.selectMotionGroup(motionGroup.motion_group);
      }
    }
  }

  async function tryLoadWandelApp() {
    try {
      await loadWandelApp();
      state.finishLoading();
    } catch (error) {
      state.receiveError(error);
    }
  }

  useEffect(() => {
    tryLoadWandelApp();
  }, []);

  if (state.loading) {
    return <LoadingScreen message={state.loading} error={state.error} />;
  }

  return (
    <WandelAppContext.Provider value={state.wandelApp}>
      {props.children}
    </WandelAppContext.Provider>
  );
});
