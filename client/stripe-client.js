var publicStripeAPIKey = '';
var publicStripeAPIKeyTesting = 'pk_test_PmR2WViSXoRhBLxQZPI9WQAn';

Meteor.subscribe("tokens");

Meteor.startup(function() {
  Stripe.setPublishableKey(publicStripeAPIKeyTesting);
})

  function stripeResponseHandler(status, response) {
    console.log(status);
    console.log(response);
    if (status == 200){
    var email = Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address
    Meteor.call("savetoken", response.id, email)
    }
    else {
    alert("Error. Please check your credit card information");
    }
  }

Template.bulletin.helpers({
  entries: function () {
    return Tokens.find({});
  },
  total: function () {
    return Tokens.find({}).count()
  },
})

Template.paymentform.events({
  'click .submit-button': function (e) {
    console.log("hit the button");

    var cardnumber = document.getElementsByClassName("card-number").item(0).value;
    var cardcvc = document.getElementsByClassName("card-cvc").item(0).value;
    var cardexpirymonth = document.getElementsByClassName("card-expiry-month").item(0).value;
    var cardexpiryyear = document.getElementsByClassName("card-expiry-year").item(0).value;
  Stripe.createToken({
    number: cardnumber,
    cvc: cardcvc,
    exp_month: cardexpirymonth,
    exp_year: cardexpiryyear
  }, stripeResponseHandler);


  }

});


