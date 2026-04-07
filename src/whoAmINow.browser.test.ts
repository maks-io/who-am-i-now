/**
 * @jest-environment jsdom
 */

export {};

const loadWhoAmINow = () => {
  let whoAmINow!: typeof import("./whoAmINow").whoAmINow;

  jest.isolateModules(() => {
    ({ whoAmINow } = require("./whoAmINow"));
  });

  return whoAmINow;
};

describe("whoAmINow in a browser runtime", () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "",
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    Object.defineProperty(window.navigator, "standalone", {
      configurable: true,
      value: false,
    });
  });

  it("detects a react next.js app in the browser", () => {
    document.body.innerHTML = '<div id="__next"></div>';

    jest.doMock("react-device-detect", () => ({
      browserName: "Chrome",
      isChrome: true,
      isMobileOnly: false,
    }));
    jest.doMock("is-ci", () => false);

    const whoAmINow = loadWhoAmINow();
    const who = whoAmINow();

    expect(who.isBrowser).toBe(true);
    expect(who.isReactApp).toBe(true);
    expect(who.isNextApp).toBe(true);
    expect(who.isServerApp).toBe(false);
    expect(who.isChrome).toBe(true);
    expect(who.isDesktop).toBe(true);
  });

  it("detects standalone PWA and TWA browser modes", () => {
    jest.doMock("react-device-detect", () => ({
      browserName: "Chrome",
      isMobileOnly: false,
    }));
    jest.doMock("is-ci", () => false);
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "android-app://com.example",
    });

    const whoAmINow = loadWhoAmINow();
    expect(whoAmINow().isTWA).toBe(true);

    jest.resetModules();
    Object.defineProperty(document, "referrer", {
      configurable: true,
      value: "",
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({ matches: true }),
    });
    jest.doMock("react-device-detect", () => ({
      browserName: "Chrome",
      isMobileOnly: false,
    }));
    jest.doMock("is-ci", () => false);

    const standaloneWhoAmINow = loadWhoAmINow();
    expect(standaloneWhoAmINow().isPWAStandalone).toBe(true);
  });
});
