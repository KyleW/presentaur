app.factory('sharedProperties', [function () {

  var presenterQueue = [];

  return {
    queuePresenter: function () {
      presentation.push(speaker);
    },
    removePresenter: function (speaker) {
      presenterQueue.splice(presenterQueue.indexOf(speaker), 1);
    },
    updateQueue: function (presenters) {
      presenterQueue = presenters;
    },
    getQueue: function () {
      return presenterQueue;
    }
  }

}]);