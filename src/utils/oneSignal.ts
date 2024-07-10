// utils/onesignal.ts
import OneSignal from "react-onesignal";
import config from "./config";

export const initOneSignal = async () => {
  console.log("Initializing OneSignal...");
  window.OneSignal = window.OneSignal || [];
  window.OneSignal.push(function () {
    window.OneSignal.init({
      appId: "YOUR_ONESIGNAL_APP_ID",
      allowLocalhostAsSecureOrigin: true // For local development
    });

    window.OneSignal.on("subscriptionChange", function (isSubscribed) {
      console.log("The user's subscription state is now:", isSubscribed);
    });

    window.OneSignal.getUserId().then(function (userId) {
      console.log("User ID:", userId);
    });

    window.OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
      console.log("Push notifications enabled:", isEnabled);
    });
  });
  //   console.log("Initializing OneSignal...");
  //   await OneSignal.init({
  //     appId: config.oneSignalAppId
  //   });
  //   OneSignal.Slidedown.promptPush();
  //   console.log(window.OneSignal?.User);
  //   window.OneSignal;
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.getRegistrations().then((registrations) => {
  //       registrations.forEach((registration) => {
  //         console.log(
  //           "Service Worker registered with scope:",
  //           registration.scope
  //         );
  //       });
  //     });
  //   }
  //   const oneSignalAny = window.OneSignal?.Notifications;
  //   oneSignalAny?.addEventListener("permissionPromptDisplay", (e) => {
  //     console.log("permissionPromptDisplay");
  //   });
  //   console.warn(oneSignalAny?.isPushSupported(), "is push supported");
  //   console.log(window.OneSignal?.User.PushSubscription.token, "token");
  //   window.OneSignal?.User.PushSubscription.addEventListener("change", (e) => {
  //     console.log("subscripton change ", e);
  //   });
};
