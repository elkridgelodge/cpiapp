Meteor.subscribe('referralcode')

Template.signupreferral.events({
    'submit form': function(event) {
        event.preventDefault()
        var emailVar = event.target.registerEmail.value
//taking this from the URL now instead of from a field
//        var referralCode = event.target.referralCode.value
var queryDict = {}
window.location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
//looks like something.com/?ref=referralcode
console.log(queryDict)
if (queryDict.ref) {
console.log(queryDict.ref)
} else {
console.log('no queryDict.ref')
}
/*
        Accounts.createUser({
             email: emailVar,
             password: passwordVar
        });
*/

        var referralCode = queryDict.ref
//var referralCode = Meteor.user().referral.code
        var userObj = {}
        userObj.emails = [{address: emailVar, verified: false}]
        if (emailVar && referralCode) {
          Meteor.call("newUser", userObj, referralCode)
        } else if (!referralCode) {
          alert("Missing referral code")
        } else {
          alert("Missing email")
        }
        console.log("Form submitted.");
    }

});
