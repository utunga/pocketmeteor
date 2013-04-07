// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Accounts = new Meteor.Collection("accounts");
Events = new Meteor.Collection("events");
Balances = new Meteor.Collection("balances");

var accountsHandle;

Meteor.startup(function () {
	// Subscribe to 'accounts' collection on startup.
	accountsHandle = Meteor.subscribe('accounts');

	// Subscribe to 'events' collection on startup
	Meteor.subscribe('events');

    Meteor.call('getBalances', function(err,result) {
      if (err === undefined) {
        Session.set("balances", result);
        console.log("here");
        console.log(result);
      } else {
        console.log(err);
      }
    });
});

////////// Accounts //////////

Template.accounts.loading = function () {
  return false; //accountsHandle===undefined || !accountsHandle.ready();
};


Template.accounts.balances = function () {
	return Session.get("balances");
}

Template.accounts.accounts = function () {
  return Accounts.find({}, {sort: {name: 1}});
};

Template.account.balance = function() {
	var accountEvents = Events.find({account_id: this._id});
	var balance = 0;
	accountEvents.forEach(function (nextEvent) {
			balance = balance + nextEvent.amt;
	})
	return balance;
};



// Some random handle bars stuff ... not sure where to put
Handlebars.registerHelper('formatCurrency', function(value) {
    var price = (parseInt(value*100)/100).toFixed(2);
	return "$" + price;
});

