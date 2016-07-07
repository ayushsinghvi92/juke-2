'use strict';

juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  return statsObj;
});

// juke.factory('TimeFormat', function (StatsFactory) {
//   var timeObject = {};
//   timeObject.formattedTime = function (album) {
//     StatsFactory.totalTime(album)
//     .then(function (secs) {
//       return String(secs/60) + ':' + String(secs%60);
//     })
//   }
//   return timeObject; 
// })

juke.factory('GetAlbums', function ($http) {
  var retObj = {};
  retObj.fetchAll = function () {
    return $http.get('/api/albums/')
    .then(function (res) { return res.data; })
  }
  retObj.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(function (res) { return res.data});
  }
  return retObj;
});

juke.controller('AlbumsCtrl', function (GetAlbums, StatsFactory, $scope, $rootScope, $log) {
  GetAlbums.fetchAll()
  .then(function (res){
    res.forEach(function (e) {
      e.imageUrl = '/api/albums/' + e.id  + '/image';
    });
    $scope.albums = res;
  })
})

juke.controller('AlbumCtrl', function (GetAlbums, StatsFactory, PlayerFactory, $scope, $rootScope, $log) {

  // load our initial data
  // debugger;
  GetAlbums.fetchById(1)
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id  + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    return StatsFactory.totalTime(album)
  })
  .then(function (time) {
    $scope.album.totalTime = Math.floor(time);
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
  $scope.playing = function () {
   return PlayerFactory.isPlaying();
  }  
  $scope.currentSong = function () {
   return PlayerFactory.getCurrentSong();
  }
  // main toggle

  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong) {
      PlayerFactory.pause();
    } else PlayerFactory.start(song, $scope.album.songs);
  };

});
