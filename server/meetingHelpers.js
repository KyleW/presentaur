
//docs are here: http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

var MongoClient = require('mongodb').MongoClient;
dbHelpers = require('./dbHelpers');




module.exports = {

  create: function(req, res){

    // FIXME: needs to grab name of meeting from req and insert into function

    console.log(req.data);
    var name = req.body;
    console.log('Adding meeting named: ' + name);

    dbHelpers.checkConnection();
    var doc = {meetingName: name, speakers:[]};
    dbHelpers.db.collection('meetings', function (err, collection){
      collection.insert(doc, {w:1}, function(err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          console.log('The meeting named: ' + result[0].meetingName + ' has been assigned the id: ' + result[0]._id);
          res.send(result[0]._id);
        }
      });
    });
  },

  get: function(req, res){
    console.log("recieved get request");
    var test = dbHelpers.getMeeting(1);
    console.log(test);
    // res.send();//meeting info)
  }

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
