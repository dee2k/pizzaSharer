'use strict';

app.controller('OrderCtrl', function($scope, Auth, Order){
    $scope.numbersArray = [1,2,3,4,5];
    $scope.typesArray = ["Olives","Onions", "Mushrooms"];
    $scope.subOrders = [];

    $scope.orders = Order.all;

    $scope.addSubOrder = function() {
        $scope.subOrders.push({num: $scope.numSlices, type: $scope.sliceType});
    };

    $scope.deleteSubOrder = function(index) {
        $scope.subOrders.splice(index,1);
    };

    $scope.shareOrder = function(){
        Order.create(Auth.getUid(), Auth.getUsername(), $scope.order.name);
        Order.addSubOrderToOrder($scope.uid,'dor','dor');
        // next I need to refer to /order/orderid
    };
});