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
import WhoAmINow from "who-am-i-now";

const who = WhoAmINow();

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

- inheriting the behaviour from the original `react-device-detect` library <span style="color:grey;">(grey entries in table)</span>, or
- having a different behaviour compared to the original `react-device-detect` library <span style="color:blue;">(blue entries in table)</span>, or
- is completely new (black entries in table)

| selector                                            | type                                     | explanation                                                                                                                                                                                         |
| --------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isReactNativeApp                                    | boolean                                  | returns `true` if code is running in a `react-native` app (with and without `expo`)                                                                                                                 |
| isReactNativeAppIOS                                 | boolean                                  | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `ios`                                                                                    |
| isReactNativeAppAndroid                             | boolean                                  | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `android`                                                                                |
| isReactNativeAppWeb                                 | boolean                                  | returns `true` if code is running in a `react-native` app (with and without `expo`) and if the platform is `web` (Note that this will be `false` if code is running in a plain react web app!)      |
| isExpoApp                                           | boolean                                  | returns `true` if code is running in a `react-native` app via `expo`                                                                                                                                |
| isReactApp                                          | boolean                                  | returns `true` if code is running in a `react` app                                                                                                                                                  |
| isNextApp                                           | boolean                                  | returns `true` if code is running in a `nextjs` app                                                                                                                                                 |
| isTWA                                               | boolean                                  | returns `true` if code is running as part of an android `trusted web activities` app                                                                                                                |
| isPWAStandalone                                     | boolean                                  | returns `true` if code is running as part of a `progressive web app / PWA` in `standalone` mode, meaning in an `installed` way (for instance, after user decided to _"add app to homescreen"_ etc.) |
| isServerApp                                         | boolean                                  | returns `true` if code is running in a plain `node` "server" app (imagine a classical `express` api/server for instance)                                                                            |
| isCI                                                | boolean                                  | returns `true` if code is running as part of a `continuous integration / CI` pipeline (it relies on the CI system to set the environment variable `CI=true`)                                        |
| isTestRun                                           | boolean                                  | returns `true` if code is running as part of a test run (for instance jest unit tests, etc. - it relies on the environment to set the variable `NODE_ENV=test`)                                     |
| isJestTestRun                                       | boolean                                  | returns `true` if code is running as part of a `jest` test run                                                                                                                                      |
| isCypressTestRun                                    | boolean                                  | returns `true` if code is running as part of a `cypress` test run                                                                                                                                   |
| <span style="color:blue;">isBrowser</span>          | <span style="color:blue;">boolean</span> | <span style="color:blue;">returns `true` if code is running in a browser - the behaviour from `react-device-detect` was slightly changed</span>                                                     |
| <span style="color:blue;">isMobile</span>           | <span style="color:blue;">boolean</span> | <span style="color:blue;">returns `true` if code is running in a `react-native` app (with and without `expo`)</span> but not in `web` browser (via `react-native-web`)                              |
| <span style="color:blue;">isDesktop</span>          | <span style="color:blue;">boolean</span> | <span style="color:blue;">returns `true` if code is NOT running in a `react-native` app (with and without `expo`)</span> - in other words, this is the opposite of `isMobile` above                 |
| <span style="color:grey;">isMobileOnly</span>       | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isTablet</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isSmartTV</span>          | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isWearable</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isConsole</span>          | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isEmbedded</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isAndroid</span>          | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isWinPhone</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIOS</span>              | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isChrome</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isFirefox</span>          | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isSafari</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isOpera</span>            | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIE</span>               | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isEdge</span>             | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isYandex</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isChromium</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isMobileSafari</span>     | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isSamsungBrowser</span>   | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">osVersion</span>          | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">osName</span>             | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">fullBrowserVersion</span> | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">browserVersion</span>     | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">browserName</span>        | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">mobileVendor</span>       | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">mobileModel</span>        | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">engineName</span>         | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">engineVersion</span>      | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">getUA</span>              | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">deviceType</span>         | <span style="color:grey;">string</span>  | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIOS13</span>            | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIPhone13</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIPad13</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isIPod13</span>           | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isElectron</span>         | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isEdgeChromium</span>     | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isLegacyEdge</span>       | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isWindows</span>          | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
| <span style="color:grey;">isMacOs</span>            | <span style="color:grey;">boolean</span> | <span style="color:grey;">returns the same value `react-device-detect` returns</span>                                                                                                               |
