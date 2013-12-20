module.exports = {
  create: function(req, res){
  // FIXME: changes needed
  // 1. needs to grab name of meeting from req and insert into function

  var newId = dbHelpers.createMeeting("Test3");  //createMeeting returns new meetings ID
  // res.sendMeeting(db.requestMeeting());
  },

  get: function(req, res){
    console.log("recieved get request");
    var test = dbHelpers.getMeeting(1);
    console.log(test);
    // res.send();//meeting info)
  }

};