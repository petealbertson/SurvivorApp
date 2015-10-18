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
      var teamRef = ref.child('teams');
      var teamArray = $firebaseArray(ref.child('teams'));
      var current_user_id = '001';
      var picksRef = ref.child('picks/' + current_user_id);
      var picksArray = $firebaseArray(picksRef);
      $scope.teams = teamArray;
      $scope.picks = picksArray;


      // is the game's week in the current user's picks table?
      // if yes, mark games as unavailable
      // var ref = new Firebase("https://pac12survivor.firebaseio.com/users/picks");
      var weeksArray = [];
      picksRef.child("week").on("child_added", function(weeks_snap) {
        weeksArray.push(weeks_snap.val().week);
      });

      var teamsArray = [];
      picksRef.child("team").on("child_added", function(teams_snap) {
        teamsArray.push(teams_snap.val().team);
        // console.log(teamsArray);
      });


      $scope.pickedTeam = function(team) {
        var herp = teamsArray.indexOf(team.$id);
        if (herp != -1) {
          return true;
        }
      };

      $scope.pickedWeek = function(week) {
        var derp = weeksArray.indexOf(week);
        if (derp != -1) {
          return true;
        }
      };

      $scope.pickedGame = function(team, game) {
        picksRef.child("team").on("child_added", function(teams_snap) {

        }
      }


      $scope.select = function(team, teams, game) {
        // CHECK TO SEE IF THE GAME IS AVAILABLE OR IF
        // THE TEAM HAS ALREADY BEEN CHOSEN
        // if (!team.chosen && game.available) {
          // game.selected = true;
          // console.log(game);
          // team.chosen = true;
          // ADD A PICK TO THE PICKS TABLE
          picksRef.child("week").child(game.week).set({
            user: current_user_id,
            team: team.$id,
            week: game.week
          });
          // $scope.teams.$save(team, game);

          picksRef.child("team").child(team.$id).set({
            user: current_user_id,
            team: team.$id,
            week: game.week
          });
          // $scope.teams.$save(team, game);

          // LOOP THROUGH OTHER GAMES THAT WEEK AND
          // MAKE THEM UNAVAILABLE
          // for(var i = 0; i < teams.length; i++) {
          //   var weekGame = teamRef.child(teams[i].$id + '/schedule/' + (game.week - 1));
          //   weekGame.update({
          //     "available": false
          //   });
          // }
        // } else if (game.selected) {
        //   // IF USER IS DESELECTING A GIVEN GAME, RESET
        //   // GAME AND DELETE PICK
        //   game.selected = false;
        //   // team.chosen = false;
        //   picksRef.child(game.week).remove();
        //   $scope.teams.$save(team, game);

        //   // GO BACK AND MAKE OTHER GAMES FROM THAT WEEK AVAILABLE
        //   for(var y = 0; y < teams.length; y++) {
        //     var weekGame = teamRef.child(teams[y].$id + '/schedule/' + (game.week - 1));
        //     weekGame.update({
        //       "available": true
        //     });
        //   }

        // }
      };



    });

})();
