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

'app controller goes here';
'common service goes here';
(function(){
  'use strict';


  angular.module('schedule',['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main/main.html',
          controller: 'MainCtrl'
        });
    })
    .controller('MainCtrl', function ($scope, $firebaseArray) {
      var ref = new Firebase('https://pac12survivor.firebaseio.com/');
      var teamArray = $firebaseArray(ref.child('teams'));
      $scope.teams = teamArray;

      $scope.select = function(team, teams, game) {
        if ((!team.chosen && game.available) || game.selected) {
          game.selected = !game.selected;
          team.chosen = !team.chosen;
          $scope.teams.$save(team, game);
        }
      };

      $scope.column = function(game) {
        var teamRef = new Firebase("https://pac12survivor.firebaseio.com/teams");
        teamRef.once("value", function(snapshot) {
          var teams = snapshot.val();
          for (var i = 0; i < teams.length; i++) {
            var gm = teams[i].schedule[game.week - 1]
            console.log(gm);
            gm.available = !gm.available;
            $scope.teams.$save(gm);
          }
          // data equals { "name": { "first": "Fred", "last": "Flintstone" }, "age": 53 }
          // console.log(data);  // 53
        });
      }

    });

})();
