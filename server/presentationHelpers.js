module.exports = {

  // Copy and paste from meetingHelpers

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