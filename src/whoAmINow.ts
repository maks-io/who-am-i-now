import isCi from "is-ci";
import type { BrowserTypes } from "./types/BrowserTypes";
import type { Who } from "./types/Who";

type ReactDeviceDetect = {
  browserName?: BrowserTypes;
  isMobileOnly?: boolean;
  isTablet?: boolean;
  isSmartTV?: boolean;
  isWearable?: boolean;
  isConsole?: boolean;
  isEmbedded?: boolean;
  isAndroid?: boolean;
  isWinPhone?: boolean;
  isIOS?: boolean;
  isChrome?: boolean;
  isFirefox?: boolean;
  isSafari?: boolean;
  isOpera?: boolean;
  isIE?: boolean;
  isEdge?: boolean;
  isYandex?: boolean;
  isChromium?: boolean;
  isMobileSafari?: boolean;
  isSamsungBrowser?: boolean;
  osVersion?: string;
  osName?: Who["osName"];
  fullBrowserVersion?: string;
  browserVersion?: string;
  mobileVendor?: string;
  mobileModel?: string;
  engineName?: string;
  engineVersion?: string;
  deviceType?: Who["deviceType"];
  isIOS13?: boolean;
  isIPhone13?: boolean;
  isIPad13?: boolean;
  isIPod13?: boolean;
  isElectron?: boolean;
  isEdgeChromium?: boolean;
  isLegacyEdge?: boolean;
  isWindows?: boolean;
  isMacOs?: boolean;
};

type ReactNativeModule = { valid?: boolean };
type ExpoModule = {
  valid?: boolean;
  isRunningInExpoGo?: () => boolean;
};
type ExpoConstantsModule = {
  expoConfig?: {
    scheme?: string;
  };
};

const loadOptionalDefault = <T>(modulePath: string): T | undefined => {
  try {
    const moduleValue = require(modulePath);
    return (moduleValue.default ?? moduleValue) as T;
  } catch (_error) {
    return undefined;
  }
};

const asBoolean = (value: boolean | undefined): boolean => Boolean(value);

export const whoAmINow = (): Who => {
  const reactDeviceDetect = loadOptionalDefault<ReactDeviceDetect | undefined>(
    "react-device-detect",
  );
  const browserName = reactDeviceDetect?.browserName;

  const reactNative = loadOptionalDefault<ReactNativeModule>("./reactNative");
  const isReactNativeApp =
    Boolean(reactNative) && reactNative?.valid !== false;

  const expo = loadOptionalDefault<ExpoModule>("./_expo");
  const isExpoApp = Boolean(expo) && expo?.valid !== false;

  let isExpoAppRunningInGo: boolean | undefined;
  let isExpoSnack: boolean | undefined;
  if (isExpoApp) {
    isExpoAppRunningInGo = expo?.isRunningInExpoGo?.();
    const expoConstants =
      loadOptionalDefault<ExpoConstantsModule>("./expoConstants");
    isExpoSnack = expoConstants?.expoConfig?.scheme === "snack";
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

  let isReactNativeAppIOS = false,
    isReactNativeAppAndroid = false,
    isReactNativeAppWeb = false;
  if (isReactNativeApp) {
    try {
      const platform = require("./platform").default as string | undefined;
      isReactNativeAppIOS = platform === "ios";
      isReactNativeAppAndroid = platform === "android";
      isReactNativeAppWeb = platform === "web";
    } catch (_error) {
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
    isCI: isCi,
    isTestRun,
    isCypressTestRun,
    isJestTestRun,
    isBrowser,
    isMobile,
    isDesktop,
    isMobileOnly: asBoolean(reactDeviceDetect?.isMobileOnly),
    isTablet: asBoolean(reactDeviceDetect?.isTablet),
    isSmartTV: asBoolean(reactDeviceDetect?.isSmartTV),
    isWearable: asBoolean(reactDeviceDetect?.isWearable),
    isConsole: asBoolean(reactDeviceDetect?.isConsole),
    isEmbedded: asBoolean(reactDeviceDetect?.isEmbedded),
    isAndroid: asBoolean(reactDeviceDetect?.isAndroid),
    isWinPhone: asBoolean(reactDeviceDetect?.isWinPhone),
    isIOS: asBoolean(reactDeviceDetect?.isIOS),
    isChrome: asBoolean(reactDeviceDetect?.isChrome),
    isFirefox: asBoolean(reactDeviceDetect?.isFirefox),
    isSafari: asBoolean(reactDeviceDetect?.isSafari),
    isOpera: asBoolean(reactDeviceDetect?.isOpera),
    isIE: asBoolean(reactDeviceDetect?.isIE),
    isEdge: asBoolean(reactDeviceDetect?.isEdge),
    isYandex: asBoolean(reactDeviceDetect?.isYandex),
    isChromium: asBoolean(reactDeviceDetect?.isChromium),
    isMobileSafari: asBoolean(reactDeviceDetect?.isMobileSafari),
    isSamsungBrowser: asBoolean(reactDeviceDetect?.isSamsungBrowser),
    osVersion: reactDeviceDetect?.osVersion,
    osName: reactDeviceDetect?.osName,
    fullBrowserVersion: reactDeviceDetect?.fullBrowserVersion,
    browserVersion: reactDeviceDetect?.browserVersion,
    browserName,
    mobileVendor: reactDeviceDetect?.mobileVendor,
    mobileModel: reactDeviceDetect?.mobileModel,
    engineName: reactDeviceDetect?.engineName,
    engineVersion: reactDeviceDetect?.engineVersion,
    deviceType: reactDeviceDetect?.deviceType,
    isIOS13: asBoolean(reactDeviceDetect?.isIOS13),
    isIPhone13: asBoolean(reactDeviceDetect?.isIPhone13),
    isIPad13: asBoolean(reactDeviceDetect?.isIPad13),
    isIPod13: asBoolean(reactDeviceDetect?.isIPod13),
    isElectron: asBoolean(reactDeviceDetect?.isElectron),
    isEdgeChromium: asBoolean(reactDeviceDetect?.isEdgeChromium),
    isLegacyEdge: asBoolean(reactDeviceDetect?.isLegacyEdge),
    isWindows: asBoolean(reactDeviceDetect?.isWindows),
    isMacOs: asBoolean(reactDeviceDetect?.isMacOs),
  };
};
