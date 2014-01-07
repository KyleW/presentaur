
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
    var doc = {meetingName: meetingname, speakers: speakers, _id: id, current: current};

    console.log('Adding meeting named: ' + doc.meetingName);

    dbHelpers.db.collection('meetings', function (err, collection){
      collection.save(doc, {w:1}, function (err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          console.log('The meeting named: ' + result.meetingName + ' has been assigned the id: ' + result._id);
          res.send(JSON.stringify(result));
        }
      });
    });
  },


  get: function(req, res){
    console.log("recieved get request");
    var id = req.params.id;

    console.log("retrieving meeting with criteria: ", id);
    console.log('type of id: ', (typeof id));

    dbHelpers.db.collection('meetings',function(err,collection){
      collection.find({_id:new BSON.ObjectID(id)}).toArray(function(err,result){
        if(err) {console.log("Looking for meeting failed ",err);}
        else {
          console.log("Found the meeting you're looking for" , result);
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  findByOwner: function(req, res){
    var owner_id = req.params.owner_id;
    dbHelpers.db.collection('meetings',function(err,collection){
      collection.find({owner_id: owner_id}).toArray(function(err,result){
        if(err) {console.log("Looking for meeting failed ",err);}
        else {
          console.log("Found the meeting you're looking for" , result);
          res.send(JSON.stringify(result));
        }
      });
    });
  },

};

