import { Who } from "./types/Who";
import { BrowserTypes } from "./types/BrowserTypes";

export const whoAmINow = (): Who => {
  let browserName: BrowserTypes, reactDeviceDetect;

  try {
    reactDeviceDetect = require("react-device-detect");

    browserName = reactDeviceDetect?.browserName;
  } catch (e) {
    // do nothing
  }

  let isReactNativeApp = false;
  try {
    const rn = require("./reactNative");
    isReactNativeApp = Boolean(rn?.default) && rn?.default?.valid !== false;
  } catch (e) {
    // do nothing
  }

  let expo: { default: { valid?: boolean; isExpoAppRunningInGo?: boolean } };
  let isExpoApp = false;
  try {
    expo = require("./expo").default;
    isExpoApp = Boolean(expo?.default) && expo?.default?.valid !== false;
  } catch (e) {
    // do nothing
  }

  let isExpoAppRunningInGo: boolean | undefined;
  let isExpoSnack: boolean | undefined;
  if (isExpoApp) {
    isExpoAppRunningInGo = expo.default.isExpoAppRunningInGo;
    const expoConstants: {
      default: { expoConfig: { scheme: string } };
    } = require("./expoConstants").default;
    isExpoSnack = expoConstants.default.expoConfig.scheme === "snack";
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

  if (reactDeviceDetect) {
    delete reactDeviceDetect.BrowserTypes;
    delete reactDeviceDetect.OsTypes;
  }

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
    isReactNativeApp,
    isReactNativeAppIOS,
    isReactNativeAppAndroid,
    isReactNativeAppWeb,
    isExpoApp,
    isExpoAppRunningInGo,
    isExpoSnack,
    isReactApp,
    isNextApp,
    isTWA,
    isPWAStandalone,
    isServerApp,
    isCI,
    isTestRun,
    isCypressTestRun,
    isJestTestRun,
    isBrowser,
    isMobile,
    isDesktop,
    isMobileOnly: reactDeviceDetect?.isMobileOnly as boolean,
    isTablet: reactDeviceDetect?.isTablet as boolean,
    isSmartTV: reactDeviceDetect?.isSmartTV as boolean,
    isWearable: reactDeviceDetect?.isWearable as boolean,
    isConsole: reactDeviceDetect?.isConsole as boolean,
    isEmbedded: reactDeviceDetect?.isEmbedded as boolean,
    isAndroid: reactDeviceDetect?.isAndroid as boolean,
    isWinPhone: reactDeviceDetect?.isWinPhone as boolean,
    isIOS: reactDeviceDetect?.isIOS as boolean,
    isChrome: reactDeviceDetect?.isChrome as boolean,
    isFirefox: reactDeviceDetect?.isFirefox as boolean,
    isSafari: reactDeviceDetect?.isSafari as boolean,
    isOpera: reactDeviceDetect?.isOpera as boolean,
    isIE: reactDeviceDetect?.isIE as boolean,
    isEdge: reactDeviceDetect?.isEdge as boolean,
    isYandex: reactDeviceDetect?.isYandex as boolean,
    isChromium: reactDeviceDetect?.isChromium as boolean,
    isMobileSafari: reactDeviceDetect?.isMobileSafari as boolean,
    isSamsungBrowser: reactDeviceDetect?.isSamsungBrowser as boolean,
    osVersion: reactDeviceDetect?.osVersion as string,
    osName: reactDeviceDetect?.osName,
    fullBrowserVersion: reactDeviceDetect?.fullBrowserVersion as string,
    browserVersion: reactDeviceDetect?.browserVersion as string,
    browserName,
    mobileVendor: reactDeviceDetect?.mobileVendor as string,
    mobileModel: reactDeviceDetect?.mobileModel as string,
    engineName: reactDeviceDetect?.engineName as string,
    engineVersion: reactDeviceDetect?.engineVersion as string,
    deviceType: reactDeviceDetect?.deviceType,
    isIOS13: reactDeviceDetect?.isIOS13 as boolean,
    isIPhone13: reactDeviceDetect?.isIPhone13 as boolean,
    isIPad13: reactDeviceDetect?.isIPad13 as boolean,
    isIPod13: reactDeviceDetect?.isIPod13 as boolean,
    isElectron: reactDeviceDetect?.isElectron as boolean,
    isEdgeChromium: reactDeviceDetect?.isEdgeChromium as boolean,
    isLegacyEdge: reactDeviceDetect?.isLegacyEdge as boolean,
    isWindows: reactDeviceDetect?.isWindows as boolean,
    isMacOs: reactDeviceDetect?.isMacOs as boolean,
  };
};
