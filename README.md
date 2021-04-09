# LaunchDarkly Sample Server-Side Node.js Application

We've built a simple console application that demonstrates how LaunchDarkly's SDK works.  Below, you'll find the basic build procedure, but for more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/).

Please note that the LaunchDarkly Server-Side SDK for Node.js is designed primarily for use in multi-user systems such as web servers and applications. It follows the server-side LaunchDarkly model for multi-user contexts. It is not intended for use in desktop and embedded systems applications.

For a sample application demonstrating how to use LaunchDarkly in *client-side* Node.js applications, refer to our [Client-side Node.js SDK sample application](https://github.com/launchdarkly/hello-node-client).

## Build instructions

1. Install the LaunchDarkly Node.js SDK by running `npm install`

2. Edit `index.js` and set the value of `sdkKey` to your LaunchDarkly SDK key. If there is an existing boolean feature flag in your LaunchDarkly project that you want to evaluate, set `featureFlagKey` to the flag key.

```js
  const sdkKey = "1234567890abcdef";

  const featureFlagKey = "my-flag";
```

3. Run `node index.js`

You should see the message `"Feature flag '<flag key>' is <true/false> for this user"`.
