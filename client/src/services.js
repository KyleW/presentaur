app.service('sharedProperties', function () {

  var presenterQueue = [];

  return {
    queuePresenter = function () {
      presentation.push(speaker);
    },
    removePresenter = function (speaker) {
      for (var i = 0; i < presenterQueue.length; i++) {
        if (presenterQueue[i].id === speaker.id) {
          presenterQueue.splice(i, 1);
        }
      };
    },
    updateQueue = function (presenters) {
      presenterQueue = presenters;
    },
    getQueue = function () {
      return presenterQueue;
    }
  }

})