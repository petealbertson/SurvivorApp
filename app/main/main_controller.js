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


      $scope.select = function(team, teams, game) {
        if ((!team.chosen && game.available) || game.selected) {
          game.selected = !game.selected;
          team.chosen = !team.chosen;
          picksRef.child(team.$id).set({
            opponent: game.opponent
          });
          // $scope.teams.$save(team, game);
        }
      };


    });

})();
