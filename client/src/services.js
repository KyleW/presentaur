app.factory('sharedProperties', [function () {

  // var presenterQueue = [];

  // placeholder for testing purposes - !!! - BROKEN AND STUPID!
  // var presenterQueue = [{name:'Bones Malone', urls:['http://www.farm2.me', 'http://www.youtube.com']}, {name:'Spiderman', urls:['http://www.spid.er/man']}, {name:'Eric Hannum', urls:['http://www.dook.ly']}];
  var presenterQueue = [{name:'Bones Malone', url:'http://www.farm2.me'}, {name:'Spiderman', url:'http://www.spid.er/man'}, {name:'Eric Hannum', url:'http://www.dook.ly'}];

  return {
    updateQueue: function (presenters) {
      presenterQueue = presenters;
    },
    getQueue: function () {
      return presenterQueue;
    }
  };

}]);