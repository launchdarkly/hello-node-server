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

async function main() {
  try {
    await ldClient.waitForInitialization({timeout: 10});

    console.log('*** SDK successfully initialized!');

    const eventKey = `update:${featureFlagKey}`;
    ldClient.on(eventKey, async () => {
      const flagValue = await ldClient.variation(featureFlagKey, context, false);
      printValueAndBanner(flagValue);
    });

    const flagValue = await ldClient.variation(featureFlagKey, context, false);
    printValueAndBanner(flagValue);

    if (typeof process.env.CI !== "undefined") {
      process.exit(0);
    }
  } catch (error) {
    console.log(`*** SDK failed to initialize: ${error}`);
    process.exit(1);
  }

}

main();
