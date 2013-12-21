
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

var mongo = require('mongodb');
var BSON =  mongo.BSONPure;
var MongoClient = mongo.MongoClient;

dbHelpers = require('./dbHelpers');




module.exports = {

  create: function(req, res){

    var id = (!req.body._id) ? null : new BSON.ObjectID(req.body._id);
    var speakers = req.body.speakers || [];
    var meetingname = req.body.meetingName;

    console.log(req.body.meetingName);

    var doc = {meetingName: meetingname, speakers: speakers, _id: id};
    console.log('Adding meeting named: ' + doc.meetingName);

    dbHelpers.checkConnection();

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
    dbHelpers.checkConnection();

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


};





  //Example for adding new entry to mongo DB
//   addWine = function(req, res) {
//     var wine = req.body;
//     console.log('Adding wine: ' + JSON.stringify(wine));
//     db.collection('wines', function(err, collection) {
//         collection.insert(wine, {safe:true}, function(err, result) {
//             if (err) {
//                 res.send({'error':'An error has occurred'});
//             } else {
//                 console.log('Success: ' + JSON.stringify(result[0]));
//                 res.send(result[0]);
//             }
//         });
//     });
// }
