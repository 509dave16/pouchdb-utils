var PouchDB = require('pouchdb');
var pouchSeed = require('pouchdb-seed-design');

var args = process.argv.slice(2);
var db = new PouchDB(args[0], {
    auth: {
        username: '509dave16',
        password: 'dsf0@mia',
    }
});

var ddoc = {
    auth: {
        validate_doc_update: function(newDoc, oldDoc, userContext, secObject) {
            var messagesStr = 'context=';
            for(var key in userContext) {
                messagesStr += ' | ' + key + ' : ' + userContext[key];
            }
            messagesStr += ' security=';
            for(var key in secObject) {
                messagesStr += ' | ' + key + ' : ' + secObject[key];
            }
            throw({ forbidden: messagesStr});
        }
    }
};

var promise = pouchSeed(db, ddoc).then(function(updated) {
  console.log(updated);
  if(updated) {
    console.log('DDocs updated!');
  } else {
    console.log('No update was necessary');
  }
});