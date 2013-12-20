
//Add the mongodb module
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
var MongoClient = require('mongodb').MongoClient;

var db;

// Connect to the db

MongoClient.connect("mongodb://localhost:27017/presDb", function(err, presDb) {
  if(err) {
    console.log("Something went wrong while trying to connect.");
  } else{
    console.log("We are connected to the database");
  }

  db = presDb;

  //Creates collections
  db.createCollection('meetings', function(err, collection) {
    if(err){console.log("error creating meetings collection: ", err);}
  });
  db.createCollection('users', function(err, collection) {
    if(err){console.log("error creating meetings collection: ", err);}
  });

});

var checkConnection = function(){
  // if connected return true
  // else open connection

  return true; // stub for code to handle a timed out connection;
};


// Manage Meetings


module.exports.createMeeting = function(meetingName){
  checkConnection();

  var doc = {meetingName: meetingName};

  db.collection('meetings').insert(doc, {w:1}, function(err, result) {
    if(err){
      console.log("Insert failed: ", err);
    } else {
      console.log("new meeting created");
    }
  });

  return 1;
  //return meeting id
};

module.exports.updateMeeting = function(meetingId,doc){
  checkConnection();
  db.collection('meetings').update({meetingId:meetingId}, doc, {w:1}, function(err, result) {
    if(err){
      console.log(err);
    } else {
      console.log("Meeting updated.");
    }
  });
};


module.exports.getMeeting = function(meetingId){
  checkConnection();
  // return db.collection('meetings').findOne({_id: meetingId});
  console.log("got request on db helpers");
  return db.collection('meetings').findOne({meetingName:"Test Meeting"});

};




// Speaker List
module.exports.getSpeakerList = function(meetingNumber){
  checkConnection();

};

module.exports.setSpeakerList = function(meetingNumber){
  checkConnection();

};



// finding meetings associated with users
module.exports.findMeetingBySpeaker = function(){
  checkConnection();

};

module.exports.findMeetingByOwner = function(){
  checkConnection();


};

module.exports.findMeetingByOwnerOrSpeaker = function(){
  checkConnection();
};
