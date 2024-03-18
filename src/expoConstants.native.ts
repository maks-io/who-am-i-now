let expoConstants;
try {
  expoConstants = require("expo-constants");
} catch (e) {}

if (!expoConstants) {
  throw new Error(
    "who-am-i-now needs peer dependency 'expo-constants' installed",
  );
}

export default expoConstants;
