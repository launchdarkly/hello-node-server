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

    // Close the LaunchDarkly SDK to flush all buffered events and close all open connections.
    //
    // IMPORTANT: in a real application, this step is something you would only do when the application is
    // about to quit-- NOT after every call to variation(). The reason that this step is inside the variation
    // handler is flags cannot be evaluated after the SDK is closed.
    ldclient.close();
  });
});
