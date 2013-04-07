

// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  
  // Accounts
  // _id
  // owner_id
  // type
  // name
  Accounts = new Meteor.Collection("accounts");

  // Events 
  // _id
  // owner_id 
  // account_id
  // date 
  // amt
  // note
  // type
  Events = new Meteor.Collection("events");
  MongoWrapper.addSupportForAggregate(Events);

  if (Accounts.find().count() === 0) {
    var data = [
      {name: "Baxter",
       type: "moneyowed",
       entries : [{type:"init",amt:10},{type:"paid",amt:-5}]
      },
      {name: "Ezra",
       type: "moneyowed",
       entries : [{type:"init",amt:3}]
      },
      {name: "Noah",
       type: "moneyowed",
       entries : [{type:"init",amt:1}]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var account_id = Accounts.insert({name: data[i].name});
      for (var j = 0; j < data[i].entries.length; j++) {
        var entry = data[i].entries[j];
        entry.account_id = account_id;
        entry.timestamp = timestamp;
        var id = Events.insert(entry);
        console.log(id);
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});
