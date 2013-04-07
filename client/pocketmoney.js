// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Accounts = new Meteor.Collection("accounts");
Events = new Meteor.Collection("events");

// Subscribe to 'accounts' collection on startup.
var accountsHandle = Meteor.subscribe('accounts');

// Subscribe to 'events' collection on startup
var eventsHandle = Meteor.subscribe('events');

var updateBalances = function() {
	Meteor.call('getBalances', function(err,result) {
      if (err === undefined) {
      	var balances = {};
      	console.log("getBalances call");
      	console.log(err);
      	console.log(result);
      	$.each(result,function(i, row) {
      		balances[row._id] = row.balance;
      	});
        Session.set("balances", balances);
      } else {
        console.log(err);
      }
    });
}

Events.find().observeChanges({
  changed: updateBalances,
  added: updateBalances,
  removed: updateBalances
});


////////// Accounts //////////

Template.accounts.loading = function () {
  return accountsHandle==null || !accountsHandle.ready();
};


Template.accounts.balances = function () {
	return Session.get("balances");
}

Template.accounts.accounts = function () {
  return Accounts.find({}, {sort: {name: 1}});
};

Template.account.balance = function() {
	var balances = Session.get("balances");
	if (balances && balances[this._id]) {
		return balances[this._id];
	}
	else {
		var accountEvents = Events.find({account_id: this._id});
		var balance = 0;
		accountEvents.forEach(function (nextEvent) {
				balance = balance + nextEvent.amt;
		})
		return balance;
	}
};

// Some random handle bars stuff ... not sure where to put
Handlebars.registerHelper('formatCurrency', function(value) {
    var price = (parseInt(value*100)/100).toFixed(2);
	return "$" + price;
});

