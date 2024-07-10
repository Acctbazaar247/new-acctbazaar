// utils/onesignal.ts
import OneSignal from "react-onesignal";
import config from "./config";

export const initOneSignal = async () => {
  try {
    console.log("Initializing OneSignal...");
    await OneSignal.init({
      appId: config.oneSignalAppId,
      allowLocalhostAsSecureOrigin: true
      //   path: "/public"
    });
    OneSignal.Slidedown.promptPush();
    console.log(window.OneSignal?.User);
    window.OneSignal;
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.getRegistrations().then((registrations) => {
    //     registrations.forEach((registration) => {
    //       console.log(
    //         "Service Worker registered with scope:",
    //         registration.scope
    //       );
    //     });
    //   });
    // }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/OneSignalSDKWorker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
    const oneSignalAny = window.OneSignal?.Notifications;
    oneSignalAny?.addEventListener("permissionPromptDisplay", (e) => {
      console.log("permissionPromptDisplay");
    });
    console.warn(oneSignalAny?.isPushSupported(), "is push supported");
    console.log(window.OneSignal?.User.PushSubscription.token, "token");
    window.OneSignal?.User.PushSubscription.addEventListener("change", (e) => {
      console.log("subscripton change ", e);
    });
  } catch (err) {
    console.log(err);
  }
};
