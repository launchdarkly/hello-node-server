var LaunchDarkly = require('ldclient-node');

// TODO : Enter your LaunchDarkly API key here
ldclient = LaunchDarkly.init("YOUR_API_KEY");

user = {
   "firstName":"Bob",
   "lastName":"Loblaw",
   "key":"bob@example.com",
   "custom":{
      "groups":"beta_testers"
   }
};

// TODO : Enter the key for your feature flag here
ldclient.toggle("YOUR_FEATURE_FLAG_KEY", user, false, function(err, showFeature) {
  if (showFeature) {
    // application code to show the feature
    console.log("Showing your feature to " + user.key );
  } else {
    // the code to run if the feature is off 
    console.log("Not showing your feature to " + user.key);
  }
  ldclient.flush();
  ldclient.close();
});

