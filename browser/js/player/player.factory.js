'use strict';

juke.factory('PlayerFactory', function($rootScope){
	var playerObj = {};
	var audio = document.createElement('audio');
	var currentSong = null;
	var currAlbum = null;
	var duration = null;
	 audio.addEventListener('ended', function () {
	 	playerObj.next();
	 });

	audio.addEventListener('timeupdate', function () {
	 	duration = audio.currentTime / audio.duration;
		$rootScope.$evalAsync();
	})
	playerObj.start = function(song, album){
		playerObj.pause();
		if (song === currentSong) return audio.play();
		if(album){
		 currAlbum = album;
		}
		currentSong = song;
		audio.src = currentSong.audioUrl;
		audio.load();
		audio.play();
	}
	playerObj.pause = function(){
		audio.pause();
	}
	playerObj.resume = function(){
		audio.play();
	}
	playerObj.isPlaying = function(){
		return !audio.paused;
	}
	playerObj.getCurrentSong = function(){
		return currentSong;
	}
	playerObj.next = function(){
		skip(1);
	}
	playerObj.previous = function(){
		skip(-1);
	}
	playerObj.getProgress = function(){
		if(!currentSong) return 0;
		return duration;
	}	

	function skip (interval) {
    	if (!currentSong) return;
    	var index = currAlbum.indexOf(currentSong);
    	index = mod( (index + (interval || 1)), currAlbum.length);
    	currentSong = currAlbum[index];
    	if (playerObj.isPlaying()) playerObj.start(playerObj.getCurrentSong());
  	};
  	function mod (num, m) { return ((num % m) + m) % m; };
	function seek (decimal) {
    	audio.currentTime = audio.duration * decimal;
  	}

	return playerObj;
});
