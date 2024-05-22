import { Workbox } from "workbox-window";

const swRegister = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const wb = new Workbox("/sw.bundle.js");
      await wb.register();
      console.log("Service worker registered");
    } catch (error) {
      console.error("Failed to register service worker", error);
    }
  } else {
    console.log("Service Worker not supported in the browser");
  }
};

export default swRegister;
