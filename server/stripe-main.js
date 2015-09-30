var stripeAPIKey = '';
var stripeAPIKeyTesting = '';
var Stripe = StripeAPI(stripeAPIKey);

Meteor.methods({
  savetoken: function (token_id, email) {
    var timestamp = (new Date()).getTime();
//console.log("token id is " + token_id);
Tokens.insert({"token_id": token_id, "email": email, "timestamp": timestamp})
  }
});

Meteor.publish("tokens", function () {
  return Tokens.find({}, {fields: {username: 0, token_id: 0}})
});
