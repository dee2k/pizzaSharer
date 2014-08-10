'use strict';

app.controller('MainCtrl', function ($scope, Auth, FIREBASE_URL, $firebaseSimpleLogin, $location, $firebase) {
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(ref);

        $scope.loginWithFacebook = function() {
            Auth.login('facebook').then(function() {
                //
            });
        };

        $scope.logout = function() {
            Auth.logout();
        };

        $scope.newOrder = function() {
            $location.path('/order');
        };

        $scope.$on('$firebaseSimpleLogin:login', function() {
            if (Auth.signedIn()) {
                $scope.username = Auth.getUsername();
            }
        });

});
