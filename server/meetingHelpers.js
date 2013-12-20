dbHelpers = require('./dbHelpers');

module.exports = {

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

  create: function(req, res){
    console.log(req.data);
    var name = req.body;
    console.log('Adding meeting named: ' + name);
  // FIXME: changes needed
  // 1. needs to grab name of meeting from req and insert into function
    var newId = dbHelpers.createMeeting(JSON.parse(name));  //createMeeting returns new meetings ID
    console.log('The meeting named: ' + name + ' has been assigned the id: ' + newId);
    res.send(newId);
  },

  get: function(req, res){
    console.log("recieved get request");
    var test = dbHelpers.getMeeting(1);
    console.log(test);
    // res.send();//meeting info)
  }

};