app.controller('SearchController', function($scope, $sce, ResultsFactory) {
	$scope.currentService = 'spotify';
	$scope.services = ['spotify', 'soundcloud', 'youtube'];

	$scope.searchTerms = {
		artist: '',
		song: ''
	};

	$scope.setService = function(service) {
		$scope.currentService = service;
	};

	$scope.submit = function(userInput) {
		if (userInput.artist.toLowerCase() ===
				$scope.searchTerms.artist.toLowerCase() &&
			userInput.song.toLowerCase() ===
				$scope.searchTerms.song.toLowerCase()) return;
		
		$scope.searchTerms = angular.copy(userInput);

		ResultsFactory.getResults($scope.searchTerms, $scope.services)
		.then(function(allResults) {
			ResultsFactory.results.spotify = allResults[0];
			ResultsFactory.results.soundcloud = allResults[1];
			ResultsFactory.results.youtube = allResults[2];
		});
	};

	$scope.getResultUrl = function(result, service) {
		if (service === 'spotify') return $sce.trustAsResourceUrl(result.preview_url);
		if (service === 'soundcloud') return $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=' + result.uri + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false');
		if (service === 'youtube') return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + result.videoId);
	};

	$scope.addToPlaylist = function(track, service) {
		console.log(track);
		console.log($scope.current);
		if (service === 'soundcloud') {
			$scope.results.soundcloud.push({
				src: track.uri
			});
			$scope.current.playlist.songs.push({
				title: 'Soundcloud Title',
				artist: 'Soundcloud Artist',
				src: track.uri
			});
		}

		console.log($scope.results);
		console.log($scope.current);
	};
});