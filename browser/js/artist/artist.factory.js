juke.factory('ArtistFactory', function ($http) {
  var retObj = {};
  retObj.fetchAll = function () {
    return $http.get('/api/artists/')
    .then(function (res) { return res.data; })
  }
  retObj.getSongs = function (id) {
  	return $http.get('/api/artists/' + id + '/songs')
    .then(function (res) { return res.data});
  }
  retObj.getAlbums = function (id) {
  	return $http.get('/api/artists/' + id + '/albums')
    .then(function (res) { return res.data});
  }
  retObj.fetchById = function (id) {
    return $http.get('/api/artists/' + id)
    .then(function (res) { return res.data});
  }
  return retObj;
});