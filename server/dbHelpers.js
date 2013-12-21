

//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/presDb", function(err, presDb) {
  if(err) {
    console.log("Something went wrong while trying to connect.");
  } else{
    console.log("We are connected to the database");
  }

  module.exports.db = presDb;

  //Creates collections
  module.exports.db.createCollection('meetings', function(err, collection) {
    if(err){console.log("error creating meetings collection: ", err);}
  });
  
  module.exports.db.createCollection('users', function(err, collection) {
    if(err){console.log("error creating meetings collection: ", err);}
  });

});



module.exports.checkConnection = function(){
  // if connected return true
  // else open connection

  return true; // stub for code to handle a timed out connection;
};




// //////////////////////////////////////////////////////////////////


// // Figure out escaping
// // Figure out check connection
// // Hanging open connection?


// // BELOW THIS POINT IS JUST STUBS. Not working yet





// // Speaker List
// module.exports.getSpeakerList = function(meetingNumber){
//   checkConnection();

// };

// module.exports.setSpeakerList = function(meetingNumber){
//   checkConnection();

// };



// // finding meetings associated with users
// module.exports.findMeetingBySpeaker = function(){
//   checkConnection();

// };

// module.exports.findMeetingByOwner = function(){
//   checkConnection();


// };

// module.exports.findMeetingByOwnerOrSpeaker = function(){
//   checkConnection();
// };
