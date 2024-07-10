importScripts("https://cdn.onesignal.com/sdks/OneSignalSDK.js");
self.addEventListener("push", function (event) {
  console.log("Push event received:", event);
  const data = event.data.json();
  const title = data.notification.title;
  const options = {
    body: data.notification.body,
    icon: data.notification.icon
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
