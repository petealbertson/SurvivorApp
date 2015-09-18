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
      var gameArray = $firebaseArray(ref.child('games'));
      var picksRef = ref.child('picks');
      $scope.teams = teamArray;
      $scope.games = gameArray;

      // var ref = new Firebase('https://pac12survivor.firebaseio.com/');
      // ref.orderByKey().on("child_added", function(snapshot) {
      //   console.log(snapshot.key());
      // });


      $scope.select = function(team, teams, game) {
        if ((!team.chosen && game.available) || game.selected) {
          game.selected = !game.selected;
          team.chosen = !team.chosen;
          picksRef.child(team.$id).set({
            opponent: game.opponent
          });
          $scope.teams.$save(team, game);
          var teamRef = new Firebase('https://pac12survivor.firebaseio.com/' + team.$id);
          // teamRef.orderByChild(team.schedule[game.week]);
          console.log(team.schedule[game.week - 1]);
        }
      };


    });

})();
