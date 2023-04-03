# who-am-i-now

[![Version](https://img.shields.io/npm/v/who-am-i-now)](https://www.npmjs.com/package/who-am-i-now)

Which platform am I on?

Do you need to run platform specific code?

If you need to (programmatically) find the answer to one of the following questions then this package is for you:

- _"is my app a **react** frontend?"_
- _"is my app a **nextjs** app?"_
- _"is my app a **PWA standalone** (installed) app?"_
- _"is my app a **react-native** app?"_
- _"is my app an **expo** app?"_
- _"is my react-native or expo app running on **ios**, **android** or **web**?"_
- _"is my app a plain **node server**?"_
- etc.

This package is extending the functionality of [react-device-detect](https://www.npmjs.com/package/react-device-detect), by additionally detecting which 'platform' your code is running on and other things.

## Installation

Via npm:

```bash
npm i who-am-i-now --save
```

Via yarn:

```bash
yarn add who-am-i-now
```

## Usage

```typescript
import WhoAmINow, { Who } from "who-am-i-now";

const who: Who = WhoAmINow();

// Example result:
// who = {
//     isMobile: true,
//     isBrowser: false,
//     isReactNativeApp: true,
//     isReactNativeAppIOS: true,
//     isReactNativeAppAndroid: false,
//     isReactNativeAppWeb: false,
//     isExpoApp: true,
//     isReactApp: false,
//     isNextApp: false,
//     isTWA: false,
//     isPWAStandalone: false,
//     isServerApp: false,
//     ... and many others - check section below for details
// }
```

## Selectors

The result of calling `whoAmINow()` is an object holding various selectors/booleans/values.
Every prop is either

- inheriting the behaviour from the original `react-device-detect` library (entries marked with \*\*), or
- having a different behaviour compared to the original `react-device-detect` library (entries marked with \*), or
- completely new (entries in table without asterisks)

| selector                | type    | explanation                                                                                                                                                                                         |
| ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isReactNativeApp        | boolean | returns `true` if code is running in a `react-native` app (with and without `expo`)                                                                                                                 |
| isReactNativeAppIOS     | boolean | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `ios`                                                                                    |
| isReactNativeAppAndroid | boolean | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `android`                                                                                |
| isReactNativeAppWeb     | boolean | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `web` (Note that this will be `false` if code is running in a plain react web app!)      |
| isExpoApp               | boolean | returns `true` if code is running in a `react-native` app via `expo`                                                                                                                                |
| isReactApp              | boolean | returns `true` if code is running in a `react` app                                                                                                                                                  |
| isNextApp               | boolean | returns `true` if code is running in a `nextjs` app                                                                                                                                                 |
| isTWA                   | boolean | returns `true` if code is running as part of an android `trusted web activities` app                                                                                                                |
| isPWAStandalone         | boolean | returns `true` if code is running as part of a `progressive web app / PWA` in `standalone` mode, meaning in an `installed` way (for instance, after user decided to _"add app to homescreen"_ etc.) |
| isServerApp             | boolean | returns `true` if code is running in a plain `node` "server" app (imagine a classical `express` api/server for instance)                                                                            |
| isCI                    | boolean | returns `true` if code is running as part of a `continuous integration / CI` pipeline (it relies on the CI system to set the environment variable `CI=true`)                                        |
| isTestRun               | boolean | returns `true` if code is running as part of a test run (for instance jest unit tests, etc. - it relies on the environment to set the variable `NODE_ENV=test`)                                     |
| isJestTestRun           | boolean | returns `true` if code is running as part of a `jest` test run                                                                                                                                      |
| isCypressTestRun        | boolean | returns `true` if code is running as part of a `cypress` test run                                                                                                                                   |
| isBrowser\*             | boolean | returns `true` if code is running in a browser - the behaviour from `react-device-detect` was slightly changed                                                                                      |
| isMobile\*              | boolean | returns `true` if code is running in a `react-native` app (with and without `expo`) but not in `web` browser (via `react-native-web`)                                                               |
| isDesktop\*             | boolean | returns `true` if code is NOT running in a `react-native` app (with and without `expo`) - in other words, this is the opposite of `isMobile` above                                                  |
| isMobileOnly\*\*        | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isTablet\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isSmartTV\*\*           | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isWearable\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isConsole\*\*           | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isEmbedded\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isAndroid\*\*           | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isWinPhone\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIOS\*\*               | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isChrome\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isFirefox\*\*           | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isSafari\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isOpera\*\*             | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIE\*\*                | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isEdge\*\*              | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isYandex\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isChromium\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isMobileSafari\*\*      | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isSamsungBrowser\*\*    | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| osVersion\*\*           | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| osName\*\*              | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| fullBrowserVersion\*\*  | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| browserVersion\*\*      | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| browserName\*\*         | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| mobileVendor\*\*        | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| mobileModel\*\*         | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| engineName\*\*          | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| engineVersion\*\*       | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| getUA\*\*               | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| deviceType\*\*          | string  | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIOS13\*\*             | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIPhone13\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIPad13\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isIPod13\*\*            | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isElectron\*\*          | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isEdgeChromium\*\*      | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isLegacyEdge\*\*        | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isWindows\*\*           | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
| isMacOs\*\*             | boolean | returns the same value `react-device-detect` returns                                                                                                                                                |
