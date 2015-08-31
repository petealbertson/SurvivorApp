(function(){
	'use strict';

	angular.module('SurvivorApp', [ 'ngRoute','schedule','templates', 'firebase' ])
    .config(function ($routeProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });
    });

})();
