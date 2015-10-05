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
        })
        .when('/login', {
          templateUrl: 'main/login.html',
          controller: 'AuthCtrl'
        });
    })
    .controller('MainCtrl', function ($scope, $firebaseArray) {
      var ref = new Firebase('https://pac12survivor.firebaseio.com/');
      var teamRef = new Firebase('https://pac12survivor.firebaseio.com/teams');
      var teamArray = $firebaseArray(ref.child('teams'));
      var gameArray = $firebaseArray(ref.child('games'));
      var user_id = '001';
      var picksRef = ref.child('picks/' + user_id);
      var picksArray = $firebaseArray(picksRef);
      $scope.teams = teamArray;
      $scope.games = gameArray;
      $scope.picks = picksArray;
      // console.log($scope.picks);

      // picksRef.on("value", function(snapshot) {
      //   console.log(snapshot.val());
      // });

      // $scope.toggleClass = function() {
      //   if ()
      // }


      $scope.select = function(team, teams, game) {
        // CHECK TO SEE IF THE GAME IS AVAILABLE OR IF
        // THE TEAM HAS ALREADY BEEN CHOSEN
        if (!team.chosen && game.available) {
          game.selected = true;
          // team.chosen = true;
          // ADD A PICK TO THE PICKS TABLE
          picksRef.child(game.week).set({
            user: user_id,
            team: team.$id,
            week: game.week
          });
          $scope.teams.$save(team, game);

          // LOOP THROUGH OTHER GAMES THAT WEEK AND
          // MAKE THEM UNAVAILABLE
          for(var i = 0; i < teams.length; i++) {
            var weekGame = teamRef.child(teams[i].$id + '/schedule/' + (game.week - 1));
            weekGame.update({
              "available": false
            });
          }
        } else if (game.selected) {
          // IF USER IS DESELECTING A GIVEN GAME, RESET
          // GAME AND DELETE PICK
          game.selected = false;
          // team.chosen = false;
          picksRef.child(game.week).remove();
          $scope.teams.$save(team, game);

          // GO BACK AND MAKE OTHER GAMES FROM THAT WEEK AVAILABLE
          for(var i = 0; i < teams.length; i++) {
            var weekGame = teamRef.child(teams[i].$id + '/schedule/' + (game.week - 1));
            weekGame.update({
              "available": true
            });

          }
        }
      };



    });

})();
