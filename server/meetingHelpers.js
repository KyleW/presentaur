
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

var MongoClient = require('mongodb').MongoClient;
dbHelpers = require('./dbHelpers');




module.exports = {

  create: function(req, res){

    // FIXME: needs to grab name of meeting from req and insert into function

    console.log(req.body.meetingName);
    var doc = req.body;
    console.log('Adding meeting named: ' + doc.meetingName);

    dbHelpers.checkConnection();

    dbHelpers.db.collection('meetings', function (err, collection){
      collection.save(doc, {w:1}, function(err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          console.log('The meeting named: ' + result[0].meetingName + ' has been assigned the id: ' + result[0]._id);
          res.send(JSON.stringify(result[0]));
        }
      });
    });
  },


  get: function(req, res){
    console.log("recieved get request");
    dbHelpers.checkConnection();

    var doc = req.body;  //THIS LINE MIGHT NOT WORK

    console.log("retrieving meeting with criteria: ", doc);

    dbHelpers.db.collection('meetings',function(err,collection){
      collection.find(doc,function(err,result){
        if(err) {console.log("Looking for meeting failed ",err);}
        else {
          console.log("Found the meeting you're looking for" , result.toArray());
          res.send(JSON.stringify(result.toArray()));
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
