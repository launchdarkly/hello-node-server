const LaunchDarkly = require('@launchdarkly/node-server-sdk');

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY ?? 'your-sdk-key';

// Set featureFlagKey to the feature flag key you want to evaluate.
const featureFlagKey = process.env.LAUNCHDARKLY_FLAG_KEY ?? 'sample-feature';

function showBanner() {
  console.log(
    `        ██
          ██
      ████████
         ███████
██ LAUNCHDARKLY █
         ███████
      ████████
          ██
        ██
`,
  );
}

function printValueAndBanner(flagValue) {
  console.log(`*** The '${featureFlagKey}' feature flag evaluates to ${flagValue}.`);

  if (flagValue) showBanner();
}

if (!sdkKey) {
  console.log('*** Please edit index.js to set sdkKey to your LaunchDarkly SDK key first.');
  process.exit(1);
}

const ldClient = LaunchDarkly.init(sdkKey);

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
  kind: 'user',
  key: 'example-user-key',
  name: 'Sandy',
};

ldClient
  .waitForInitialization()
  .then(() => {
    console.log('*** SDK successfully initialized!');

    const eventKey = `update:${featureFlagKey}`;
    ldClient.on(eventKey, () => {
      ldClient.variation(featureFlagKey, context, false).then(printValueAndBanner);
    });

    ldClient.variation(featureFlagKey, context, false).then((flagValue) => {
      printValueAndBanner(flagValue);

      if(typeof process.env.CI !== "undefined") {
        process.exit(0);
      }
    });
  })
  .catch((error) => {
    console.log(`*** SDK failed to initialize: ${error}`);
    process.exit(1);
  });
