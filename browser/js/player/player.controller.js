'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
 
  // audio.addEventListener('timeupdate', function () {
    $scope.progress = function () {
      return 100 * PlayerFactory.getProgress();
    }
    // $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // state
  $scope.playing = function () {
   return PlayerFactory.isPlaying();
  }  
  $scope.currentSong = function () {
   return PlayerFactory.getCurrentSong();
  }
  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start(song, null);
    $scope.currentSong = PlayerFactory.getCurrentSong();
    $scope.playing = PlayerFactory.isPlaying();
  };

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () {
   PlayerFactory.next();
  }
  $scope.prev = function () {
    PlayerFactory.previous();
  }
  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
