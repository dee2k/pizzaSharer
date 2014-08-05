'use strict';

app.controller('OrderCtrl', function($scope, $firebase, FIREBASE_URL, $firebaseSimpleLogin){
    $scope.numbersArray = [1,2,3,4,5];
    $scope.typesArray = ["Olives","Onions", "Mushrooms"];
    $scope.subOrders = [];

    var ref = new Firebase(FIREBASE_URL + 'orders');
    var authref = new Firebase(FIREBASE_URL);
    var sync = $firebase(ref);
    var auth = $firebaseSimpleLogin(authref);

    $scope.$on('$firebaseSimpleLogin:login', function() {
        $scope.username = auth.user.displayName;
    });

    $scope.orders = sync.$asArray();

    $scope.addSubOrder = function() {
        $scope.subOrders.push({num: $scope.numSlices, type: $scope.sliceType});
    };

    $scope.deleteSubOrder = function(index) {
        $scope.subOrders.splice(index,1);
    };

    $scope.shareOrder = function(){
        $scope.orders.$add({username: $scope.username});
    };
});