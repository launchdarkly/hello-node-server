var LaunchDarkly = require('@launchdarkly/node-server-sdk');

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = process.env.LAUNCHDARKLY_SERVER_KEY;

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = typeof process.env.LAUNCHDARKLY_FLAG_KEY !== "undefined" ? process.env.LAUNCHDARKLY_FLAG_KEY : "sample-feature";

const CI = typeof process.env.CI !== "undefined";

function showBanner() {
  console.log("\n" +
  "        ██       \n" +
  "          ██     \n" +
  "      ████████   \n" +
  "         ███████ \n" +
  "██ LAUNCHDARKLY █\n" +
  "         ███████ \n" +
  "      ████████   \n" +
  "          ██     \n" +
  "        ██       \n")
}

function printValueAndBanner(_, flagValue) {
    console.log("*** Feature flag '" + featureFlagKey + "' is " + flagValue + " for this context\n");
    if(flagValue) showBanner();
}

if (sdkKey == "") {
  console.log("*** Please edit index.js to set sdkKey to your LaunchDarkly SDK key first\n");
  process.exit(1);
}

const ldClient = LaunchDarkly.init(sdkKey);

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: "user",
  key: "example-context-key",
  name: "Sandy"
};

ldClient.waitForInitialization().then(function () {
  console.log("*** SDK successfully initialized!\n");

  const eventKey = "update:" + featureFlagKey;
  ldClient.on(eventKey, () => {
    ldClient.variation(featureFlagKey, context, false, printValueAndBanner)
  });

  ldClient.variation(featureFlagKey, context, false, function (_, flagValue) {
    printValueAndBanner(_, flagValue);

    if(CI) process.exit(0);
  });
}).catch(function (error) {
  console.log("*** SDK failed to initialize: " + error + "\n");
  process.exit(1);
});
