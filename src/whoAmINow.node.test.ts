export {};

const loadWhoAmINow = () => {
  let whoAmINow!: typeof import("./whoAmINow").whoAmINow;

  jest.isolateModules(() => {
    ({ whoAmINow } = require("./whoAmINow"));
  });

  return whoAmINow;
};

describe("whoAmINow in a node runtime", () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.NODE_ENV;
    delete process.env.CYPRESS;
    delete process.env.JEST_WORKER_ID;
  });

  it("detects a plain server app", () => {
    jest.doMock("react-device-detect", () => ({ browserName: "none" }));
    jest.doMock("is-ci", () => false);

    const whoAmINow = loadWhoAmINow();
    const who = whoAmINow();

    expect(who.isServerApp).toBe(true);
    expect(who.isBrowser).toBe(false);
    expect(who.isReactApp).toBe(false);
    expect(who.isReactNativeApp).toBe(false);
    expect(who.isDesktop).toBe(true);
    expect(who.isCI).toBe(false);
  });

  it("detects test-related process flags", () => {
    process.env.NODE_ENV = "test";
    process.env.CYPRESS = "1";
    process.env.JEST_WORKER_ID = "3";

    jest.doMock("react-device-detect", () => ({ browserName: "none" }));
    jest.doMock("is-ci", () => true);

    const whoAmINow = loadWhoAmINow();
    const who = whoAmINow();

    expect(who.isTestRun).toBe(true);
    expect(who.isCypressTestRun).toBe(true);
    expect(who.isJestTestRun).toBe(true);
    expect(who.isCI).toBe(true);
  });

  it("detects a react native expo app on ios and snack", () => {
    jest.doMock("react-device-detect", () => ({ browserName: "none" }));
    jest.doMock("is-ci", () => false);
    jest.doMock("./reactNative", () => ({ __esModule: true, default: {} }));
    jest.doMock("./_expo", () => ({
      __esModule: true,
      default: {
        isRunningInExpoGo: () => true,
      },
    }));
    jest.doMock("./expoConstants", () => ({
      __esModule: true,
      default: {
        expoConfig: {
          scheme: "snack",
        },
      },
    }));
    jest.doMock("./platform", () => ({
      __esModule: true,
      default: "ios",
    }));

    const whoAmINow = loadWhoAmINow();
    const who = whoAmINow();

    expect(who.isReactNativeApp).toBe(true);
    expect(who.isExpoApp).toBe(true);
    expect(who.isExpoAppRunningInGo).toBe(true);
    expect(who.isExpoSnack).toBe(true);
    expect(who.isReactNativeAppIOS).toBe(true);
    expect(who.isReactNativeAppAndroid).toBe(false);
    expect(who.isReactNativeAppWeb).toBe(false);
    expect(who.isMobile).toBe(true);
    expect(who.isDesktop).toBe(false);
  });
});
