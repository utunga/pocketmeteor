

// Publish complete set of accounts for a given owner
Meteor.publish('accounts', function () {
  return Accounts.find();
});


// Publish all events for requested event
Meteor.publish('events', function () {
  return Events.find();
});

Meteor.methods( {

	getBalances: function() {
		var result = Events.aggregate(
			 [ { $group: {_id:"$account_id", balance: { $sum: "$amt"}}}]);
		console.log(result);
		return result;
	},

});
