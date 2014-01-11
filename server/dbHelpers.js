
var MongoClient = require('mongodb').MongoClient;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/presDb';


// Connect to the db
MongoClient.connect(mongoUri, function(err, presDb) {
  if(err) {
    console.log("Something went wrong while trying to connect to database.");
  } else{
    console.log("We are connected to the database");
  }

  module.exports.db = presDb;
  module.exports.db.createCollection('meetings', function(err, collection) {
    if(err){console.error("error creating meetings collection: ", err);}
  });
  module.exports.db.createCollection('users', function(err, collection) {
    if(err){console.error("error creating users collection: ", err);}
  });
});

