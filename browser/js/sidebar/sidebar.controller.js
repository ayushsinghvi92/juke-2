juke.controller('SidebarCtrl', function ($scope, $rootScope) {
	$scope.viewAlbums = function () {
		$rootScope.$broadcast('viewSwitch', {name: 'showAlbums'});
	}
	$scope.viewAllArtists = function () {
		$rootScope.$broadcast('viewSwitch', { name: 'viewAllArtists' })
	}
})