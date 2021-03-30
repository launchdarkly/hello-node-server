var LaunchDarkly = require('launchdarkly-node-server-sdk');

// TODO : Enter your LaunchDarkly SDK key here
ldclient = LaunchDarkly.init("YOUR_SDK_KEY");

user = {
   "firstName":"Bob",
   "lastName":"Loblaw",
   "key":"bob@example.com",
   "custom":{
      "groups":"beta_testers"
   }
};

ldclient.once('ready', function() {
  // TODO : Enter the key for your feature flag here
  ldclient.variation("YOUR_FEATURE_FLAG_KEY", user, false, function(err, showFeature) {
    if (showFeature) {
      // application code to show the feature
      console.log("Showing your feature to " + user.key );
    } else {
      // the code to run if the feature is off 
      console.log("Not showing your feature to " + user.key);
    }

    // Close the LaunchDarkly SDK, after ensuring that analytics events have been delivered.
    //
    // IMPORTANT: in a real application, you would only call close() when the application is
    // about to quit-- NOT after every call to variation(). The reason that this step is
    // inside the variation handler is that we want it to happen after the SDK has been
    // initialized and after the flag has been evaluated. Node.js will not allow the
    // application to exit as long as the SDK is still running.
    ldclient.flush(function() {
      ldclient.close();
    });
  });
});
