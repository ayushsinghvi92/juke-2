juke.controller('ArtistsCtrl', function (ArtistFactory, StatsFactory, $scope, $rootScope, $log) {
  ArtistFactory.fetchAll()
  .then(function (res){
    res.forEach(function (e) {
      e.imageUrl = '/api/artists/' + e.id  + '/image';
    });
    $scope.artists = res;
  })
  $scope.$on('viewSwitch', function (arg, data) {

    if(data.name == 'viewAllArtists')
      $scope.viewAllArtists = true;
    else
      $scope.viewAllArtists = false;
  });
  $scope.artistClick = function (artistId) {
    $rootScope.$broadcast ('viewSwitch', {name:"artist", id:artistId})
  }

  $scope.$on ('viewSwitch', function (arg, data) {
    if(data.name = 'artist') {
      displayArtist(data.id);
      $scope.viewArtist = true;
    }
    else {
      $scope.viewArtist = false;
    }
  })
  var displayArtist = function (num) {
    ArtistFactory.fetchById(num)
    .then(function (artist) {
      artist.imageUrl = '/api/artists/' + artist.id  + '/image';
      artist.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.artistIndex = i;
      });
      $scope.artist = artist;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
  }


})

juke.controller('ArtistCtrl', function (ArtistFactory, StatsFactory, $scope, $rootScope, $log) {

  $scope.$on ('viewSwitch', function (arg, data) {
    if(data.name = 'artist') {
      displayArtist(data.id);
      $scope.viewArtist = true;
    }
    else {
      $scope.viewArtist = false;
    }
  })

  var displayArtist = function (num) {
    ArtistFactory.fetchById(num)
    .then(function (artist) {
      artist.imageUrl = '/api/artists/' + artist.id  + '/image';
      artist.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song.id + '/audio';
        song.artistIndex = i;
      });
      $scope.artist = artist;
    })
    .then(function () {
      return ArtistFactory.getSongs(num)
    })
    .then(function (songs) {
      $scope.songs = songs;
      return ArtistFactory.getAlbums(num);
    })
    .then(function (albums) {
      $scope.albums = albums;
    })
    .catch($log.error); // $log service can be turned on and off; also, pre-bound
  }


})
