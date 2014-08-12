'use strict';

app.controller('MainCtrl', function ($scope, Auth, FIREBASE_URL, $firebaseSimpleLogin, $location) {
        var ordersref = new Firebase(FIREBASE_URL + 'orders');

        $scope.orders = [];
        $scope.ordersLink = [];

        $scope.loginWithFacebook = function() {
            Auth.login('facebook');
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

        $scope.showOrders = function() {
            if (Auth.signedIn()){
                ordersref.startAt(Auth.getUid()).endAt(Auth.getUid()).once('value', function(snap){
                    populateOrders(snap);
                });
            }
        };

        function populateOrders(snap){
            snap.forEach(function(childSnap){
                $scope.orders.push(childSnap);
            });
        }

});
