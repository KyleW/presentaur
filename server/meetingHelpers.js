
var mongo = require('mongodb');
var BSON =  mongo.BSONPure;
var MongoClient = mongo.MongoClient;
var dbHelpers = require('./dbHelpers');


module.exports = {

  create: function(req, res){
    // Formatting document for insertion
    var id = (!req.body._id) ? null : new BSON.ObjectID(req.body._id);
    var speakers = req.body.speakers || [];
    var meetingname = req.body.meetingName;
    var current = req.body.current || 0;
    var owner_id = req.body.owner_id;
    var date = req.body.date;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    var doc = {meetingName: meetingname, speakers: speakers, _id: id, owner_id: owner_id, date: date, startTime: startTime, endTime: endTime};

    dbHelpers.db.collection('meetings', function (err, collection){
      collection.save(doc, {w:1}, function (err, result) {
        if(err){
          console.log("Inserting new meeting failed: ", err);
        } else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  get: function(req, res){
    var id = req.params.id;
    dbHelpers.db.collection('meetings',function(err,collection){
      if(err) {console.log("Looking for meeting failed ",err);}
      collection.find({_id:new BSON.ObjectID(id)}).toArray(function(err,result){
        if(err) {console.log("Looking for meeting failed ",err);}
        else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  remove: function(req, res){
    var id = req.params.id;
    dbHelpers.db.collection('meetings', function(err, collection){
      if(err){console.log("Attempting to remove a meeting failed. ", err);}
      collection.remove({_id: id});
    });
  },

  findByOwner: function(req, res){
    var owner_id = req.params.id;
    dbHelpers.db.collection('meetings',function(err,collection){
      collection.find({owner_id: owner_id}).toArray(function(err,result){
        if(err) {console.log("Looking for meeting by owner id failed ",err);}
        else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  findBySpeaker: function(req, res){
    var speaker_id = req.params.id;
    dbHelpers.db.collection('meetings', function(err, collection){
      collection.find({'speakers.user_id': speaker_id}).toArray(function(err, result){
        if(err) { console.log("Looking for speakers in meeting failed ", err); }
        else {
          res.send(JSON.stringify(result));
        }
      });
    });
  }

};

