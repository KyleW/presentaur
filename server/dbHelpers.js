


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




// Manage Meetings

module.exports.createMeeting = function(meetingName){

  checkConnection();

  var doc = {meetingName: meetingName, speakers:[]};
  var newId;

  db.collection('meetings', function (err, collection){
    collection.insert(doc, {w:1}, function(err, result) {
      if(err){
        console.log("Insert failed: ", err);
      } else {
        console.log("new meeting created ",result);
        newId = result._id;
      }
    });
  });

  return newId;
};



module.exports.updateMeeting = function(meetingId,doc){

  checkConnection();
  var updatedMeeting;

  db.collection('meetings', function (err, collection){
    collection.update({meetingId:meetingId},doc, {w:1}, function(err, result) {
      if(err){
        console.log("Update failed: ", err);
      } else {
        console.log("meeting updated ",result);
        updatedMeeting = result;
      }
    });

    return updatedMeeting;

  });
};


module.exports.getMeetingById = function(meetingId){

  checkConnection();
  var meeting;

  db.collection('meetings', function (err, collection){
    collection.findOne({_id: meetingId},function(err,item){
      if(err){ console.log("Looking for that meeting failed ",err);}
      else {
        console.log("Found the meeting you're looking for ", item);
        meeting = item;
      }
    });
  });
  
  return meeting;
};





//////////////////////////////////////////////////////////////////


// Figure out escaping
// Figure out check connection
// Figure out aSync issue on response
// Hanging open connection?



// BELOW THIS POINT IS JUST STUBS. Not working yet


var checkConnection = function(){
  // if connected return true
  // else open connection

  return true; // stub for code to handle a timed out connection;
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
