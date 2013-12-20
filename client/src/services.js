app.factory('sharedProperties', [function () {

  // var presenterQueue = [];

  // placeholder for testing purposes;
  var presenterQueue = [{name:'Bones Malone', url:'http://www.farm2.me'}, {name:'Spiderman', url:'http://www.spid.er/man'}, {name:'Eric Hannum', url:'http://www.dook.ly'}]

  return {
    updateQueue: function (presenters) {
      presenterQueue = presenters;
    },
    getQueue: function () {
      return presenterQueue;
    }
  }

}]);