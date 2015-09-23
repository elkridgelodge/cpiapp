function adminUser(userId) {
  var adminUser = Meteor.users.findOne({'emails.address': "pappassj@aol.com"})
  return (userId && adminUser && userId == adminUser._id)
}

Meteor.publish('userscount', function() {
  Counts.publish(this, 'users-counter', Meteor.users.find())
})

Meteor.publish('vendorscount', function() {
  Counts.publish(this, 'vendors-counter', Meteor.users.find({type: "vendor"}))
})

Meteor.methods({
  CPDbalance: function (userId) {
    if (!userId) {
      throw new Meteor.Error("no-user-id", "No User Id")
    }
    return Meteor.users.findOne({}).account.CPD
  },
  USDbalance: function (userId) {
    if (!userId) {
      throw new Meteor.Error("no-user-id", "No User Id")
    }
    return Meteor.users.findOne({}).account.USD
  },
  adminfunc: function (userId) {
    var adminUser = Meteor.users.findOne({'emails.address': "pappassj@aol.com"})
    if (!adminUser) {
      throw new Meteor.Error("no-admin-user", "No Admin User Found")
    }
    if (!userId) {
      throw new Meteor.Error("no-user-id", "No User Id")
    }
    if (!(userId == adminUser._id)) {
      throw new Meteor.Error("userId-not-equal-adminUser-Id", "User Id is not equal to admin user Id " + userId + " " + adminUser._id)
    }
    if (userId && adminUser && userId == adminUser._id) {
      appDump.allow = function() {
        return (userId && adminUser && userId == adminUser._id)
      }
      return true
    } else {
      return false
    }
  },
})
