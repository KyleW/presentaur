
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

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
    var doc = {meetingName: meetingname, speakers: speakers, _id: id, current: current , owner_id: owner_id};

    dbHelpers.db.collection('meetings', function (err, collection){
      collection.save(doc, {w:1}, function (err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  get: function(req, res){
    var id = req.params.id;
    dbHelpers.db.collection('meetings',function(err,collection){
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
      collection.remove({_id: id});
    });
  },

  findByOwner: function(req, res){
    var owner_id = req.params.id;
    dbHelpers.db.collection('meetings',function(err,collection){
      collection.find({owner_id: owner_id}).toArray(function(err,result){
        if(err) {console.log("Looking for meeting failed ",err);}
        else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  findBySpeaker: function(req, res){
    var speaker_id = req.params.id;
    console.log("speaker id ------------- ", speaker_id);
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

