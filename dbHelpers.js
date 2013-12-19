
//Add the mongodb module
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/presDb", function(err, db) {
  if(err) {
    console.log("Something went wrong while trying to connect.");
  } else{
    console.log("We are connected");
  }

  //Creates collections
  db.createCollection('meetings', function(err, collection) {});
  db.createCollection('users', function(err, collection) {});

});





// Manage Meetings
module.exports.getMeeting = function(meetingId){
  return presDb.meetings.findOne({_id: meetingId});
};

module.exports.createMeeting=function(meetingName){
  return PresDb.meetings.findAndModify( {
    query: { meetingName: "Andy" },
    sort: { rating: 1 },
    update: { $inc: { score: 1 } },
    upsert: true
  });//what information do we have at insert? assuming nothing
};

module.exports.updateMeeting = function(){

};





// Speaker List

module.exports.getSpeakerList = function(meetingNumber){

};

module.exports.setSpeakerList = function(meetingNumber){

};



// finding meetings associated with users

module.exports.findMeetingBySpeaker = function(){

};

module.exports.findMeetingByOwner = function(){

};

module.exports.findMeetingByOwnerOrSpeaker = function(){

};
