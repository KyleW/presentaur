app.factory('sharedMethods', [function () {

  // var presenterQueue = [];

  // placeholder for testing purposes - !!! - BROKEN AND STUPID!
  // var presenterQueue = [{name:'Bones Malone', urls:['http://www.farm2.me', 'http://www.youtube.com']}, {name:'Spiderman', urls:['http://www.spid.er/man']}, {name:'Eric Hannum', urls:['http://www.dook.ly']}];
  // var meeting = {_id: '5', meetingName:'The Example Meeting', speakers:[{name:'Bones Malone', url:'http://slid.es/erichannum/organized-crime'}, {name:'Spiderman', url:'http://www.spid.er/man'}, {name:'Eric Hannum', url:'http://www.dook.ly'}]};
  var meeting;
  
  return {
    updateQueue: function (presenters) {
      meeting.speakers = presenters;
    },
    getQueue: function () {
      return meeting.speakers;
    },
    getMeeting: function () {
      return meeting;
    },
    updateMeeting: function (updated) {
      meeting = updated;
    },
    createMeeting: function (name, id) {
      meeting = {_id: id, meetingName: name, speakers: []};
    }
  };
}]);