Meteor.subscribe('userscount')
Meteor.subscribe('vendorscount')

Template.accountBalances.helpers({
  CBD: function () {
    var userId = Meteor.userId()
    Meteor.call("CBDbalance", [Meteor.userId()], function (error, result) {
      if (error) {
        console.log(error.reason)
      }
      else {
        Session.set('CBDbalance', result)
//        console.log(result)
//        return result
      }
    })
    return Session.get('CBDbalance')
  },
  USD: function () {
    var userId = Meteor.userId()
    Meteor.call("USDbalance", [Meteor.userId()], function (error, result) {
      if (error) {
//        console.log(error.reason)
      }
      else {
        Session.set('USDbalance', result)
//        console.log(result)
//        return result
      }
    })
    return Session.get('USDbalance')
  },
})

Template.maintemplate.helpers({
  adminuser: function () {
    console.log(Meteor.userId())
    Meteor.call("adminfunc", [Meteor.userId()], function (error, result) {
      if (error) {
//        console.log(error.reason)
      }
      else {
        Session.set('adminthingie', result)
//        console.log(result)
//        return result
      }
    })
    return Session.get('adminthingie')
  },
})



Template.userscount.helpers({
  userscount: function () {
    return Counts.get('users-counter')
  },
  vendorscount: function () {
    return Counts.get('users-vendors')
  },
})

/*
var queryDict = {};
window.location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
console.log(queryDict)
if (queryDict.ref) {
  console.log("found queryDict.ref " + queryDict.ref)
  var ret = Meteor.call('newUser', {
    emails: [
      { address: 'johnsfriend@example.com' }
    ],
  }, queryDict.ref);
} else {
  var ret = Meteor.call('newUser', {
    emails: [
      { address: 'john@example.com' }
    ],
  })
}
*/
