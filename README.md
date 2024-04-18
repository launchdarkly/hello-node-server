# LaunchDarkly sample Node.js (server-side) application

We've built a simple console application that demonstrates how LaunchDarkly's SDK works.

Below, you'll find the build procedure. For more comprehensive instructions, you can visit your [Quickstart page](https://app.launchdarkly.com/quickstart#/) or the [Node.js (server-side) reference guide](https://docs.launchdarkly.com/sdk/server-side/node-js).

The LaunchDarkly server-side SDK for Node.js is designed primarily for use in multi-user systems such as web servers and applications. It follows the server-side LaunchDarkly model for multi-user contexts. It is not intended for use in desktop and embedded systems applications.

For a sample application demonstrating how to use LaunchDarkly in *client-side* Node.js applications, refer to our [Client-side Node.js SDK sample application](https://github.com/launchdarkly/hello-node-client).

## Build instructions

1. Set the environment variable `LAUNCHDARKLY_SERVER_KEY` to your LaunchDarkly SDK key. If there is an existing boolean feature flag in your LaunchDarkly project that you want to evaluate, set `LAUNCHDARKLY_FLAG_KEY` to the flag key; otherwise, a boolean flag of `sample-feature` will be assumed.

    ```bash
    export LAUNCHDARKLY_SERVER_KEY="1234567890abcdef"
    export LAUNCHDARKLY_FLAG_KEY="my-boolean-flag"
    ```

2. Install the LaunchDarkly Node.js SDK by running `npm install`

3. Run `node index.js`

You should receive the message "The <flagKey> feature flag evaluates to <flagValue>.". The application will run continuously and react to the flag changes in LaunchDarkly.
