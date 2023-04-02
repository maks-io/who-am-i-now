export const whoAmINow = () => {
  let browserName, reactDeviceDetect;

  try {
    reactDeviceDetect = require("react-device-detect");

    browserName = reactDeviceDetect?.browserName;
  } catch (e) {
    // do nothing
  }

  let isReactNativeApp = false;
  try {
    const rn = require("./reactNative");
    isReactNativeApp = Boolean(rn?.default);
  } catch (e) {
    // do nothing
  }

  let isExpoApp = false;
  try {
    const expo = require("./expo");
    isExpoApp = Boolean(expo?.default);
  } catch (e) {
    // do nothing
  }

  let isBrowser: boolean;
  if (isReactNativeApp) {
    isBrowser = false;
  } else if (browserName === "none") {
    isBrowser = false;
  } else if (!browserName) {
    isBrowser = false;
  } else {
    isBrowser = true;
  }

  let isReactApp = !isReactNativeApp && typeof document !== "undefined";
  let isServerApp = !isReactApp && !isReactNativeApp;
  let isNextApp = isReactApp && Boolean(document?.getElementById("__next"));

  delete reactDeviceDetect.BrowserTypes;
  delete reactDeviceDetect.OsTypes;

  let isReactNativeAppIOS = false,
    isReactNativeAppAndroid = false,
    isReactNativeAppWeb = false;
  if (isReactNativeApp) {
    try {
      const platform = require("./platform").default;
      isReactNativeAppIOS = platform === "ios";
      isReactNativeAppAndroid = platform === "android";
      isReactNativeAppWeb = platform === "web";
    } catch (e) {
      // do nothing
    }
  }

  const isMobile = isReactNativeApp && !isReactNativeAppWeb;

  const isDesktop = !isMobile;

  let isTWA = false,
    isPWAStandalone = false;
  let isStandalone = false;
  if (
    typeof window !== "undefined" &&
    typeof window?.matchMedia === "function"
  ) {
    isStandalone = window?.matchMedia("(display-mode: standalone)")?.matches;
  }
  if (typeof document !== "undefined") {
    if (document?.referrer?.startsWith("android-app://")) {
      isTWA = true;
    } else if ((navigator as any)?.standalone || isStandalone) {
      isPWAStandalone = true;
    }
  }

  let isCI = process.env.CI === "true";
  let isTestRun = process.env.NODE_ENV === "test";
  let isCypressTestRun = Boolean(process.env.CYPRESS);
  let isJestTestRun = Boolean(process.env.JEST_WORKER_ID);

  return {
    ...reactDeviceDetect,
    isBrowser,
    isMobile,
    isDesktop,
    isReactNativeApp,
    isReactNativeAppIOS,
    isReactNativeAppAndroid,
    isReactNativeAppWeb,
    isExpoApp,
    isReactApp,
    isNextApp,
    isTWA,
    isPWAStandalone,
    isServerApp,
    isCI,
    isTestRun,
    isCypressTestRun,
    isJestTestRun,
  };
};
