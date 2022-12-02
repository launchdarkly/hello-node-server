var LaunchDarkly = require('launchdarkly-node-server-sdk');

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = "";

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = "my-boolean-flag";

function showMessage(s) {
  console.log("*** " + s);
  console.log("");
}

if (sdkKey == "") {
  showMessage("Please edit index.js to set sdkKey to your LaunchDarkly SDK key first");
  process.exit(1);
}

const ldClient = LaunchDarkly.init(sdkKey);

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: "user",
  key: "example-user-key",
  name: "Sandy"
};

ldClient.waitForInitialization().then(function () {
  showMessage("SDK successfully initialized!");
  ldClient.variation(featureFlagKey, context, false, function (err, flagValue) {
    showMessage("Feature flag '" + featureFlagKey + "' is " + flagValue + " for this user");

    // Here we ensure that the SDK shuts down cleanly and has a chance to deliver analytics
    // events to LaunchDarkly before the program exits. If analytics events are not delivered,
    // the user properties and flag usage statistics will not appear on your dashboard. In a
    // normal long-running application, the SDK would continue running and events would be
    // delivered automatically in the background.
    ldClient.flush(function () {
      ldClient.close();
    });
  });
}).catch(function (error) {
  showMessage("SDK failed to initialize: " + error);
  process.exit(1);
});
