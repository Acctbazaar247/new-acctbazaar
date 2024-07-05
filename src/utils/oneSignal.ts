// utils/onesignal.ts
import OneSignal from "react-onesignal";
import config from "./config";

export const initOneSignal = async () => {
  console.log("Initializing OneSignal...", config.oneSignalAppId);
  await OneSignal.init({
    appId: config.oneSignalAppId, // Replace with your OneSignal App ID
    allowLocalhostAsSecureOrigin: true,
    notifyButton: {
      enable: true
    }
  });

  const oneSignalAny = OneSignal as any;

  console.log("Checking if push notifications are supported...");
  //   const isPushSupported = await oneSignalAny.isPushNotificationsSupported();
  //   console.log("Push notifications supported:", isPushSupported);

  //   if (isPushSupported) {
  //     console.log("Checking notification permission...");
  //     const permission = await oneSignalAny.getNotificationPermission();
  //     console.log("Notification permission:", permission);

  //     if (permission !== "granted") {
  //       console.log("Showing slidedown prompt...");
  //       oneSignalAny.showSlidedownPrompt();
  //     }
  //   }
};
