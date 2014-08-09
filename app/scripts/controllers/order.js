'use strict';

app.controller('OrderCtrl', function($scope, $firebase, FIREBASE_URL, $location, $routeParams, Auth, Order){
    var orderId = $routeParams.orderid,
        ref = new Firebase(FIREBASE_URL + 'orders/' + orderId),
        subRef = new Firebase(FIREBASE_URL + 'orders/' + orderId + '/suborders/'),
        orderRef = $firebase(ref).$asObject(),
        subOrdersRef = $firebase(subRef).$asArray();

    $scope.numbersArray = [1,2,3,4,5];
    $scope.typesArray = ["Olives","Onions", "Mushrooms"];
    $scope.subOrders = [];

    $scope.addSubOrder = function() {
        $scope.subOrders.push({num: $scope.numSlices, type: $scope.sliceType});
        if ($scope.isOrderView()){
            Order.addSubOrderToOrder(ref, Auth.getUid(), Auth.getUsername(), $scope.subOrders);
        }
    };

    $scope.deleteSubOrder = function(index) {
        $scope.subOrders.splice(index,1);
    };

    $scope.shareOrder = function(){
        Order.create(Auth.getUid(), Auth.getUsername(), $scope.order.name).then(function(ref){
            Order.addSubOrderToOrder(ref, Auth.getUid(), Auth.getUsername(), $scope.subOrders);
            $scope.subOrders = [];
            $location.path('/orders/' + ref.name().toString());
        });
    };

    $scope.isOrderView = function(){
        return (orderId) ? true : false ;
    };

    $scope.isOwner = function() {
        return ($scope.isOrderView() && Auth.getUid() === $scope.order.ownerid) ? true : false
    };

    orderRef.$loaded().then(function(){
        console.log('record has id' + orderRef.$id);
        $scope.order = orderRef;
    });

    subOrdersRef.$loaded().then(function(){
        $scope.subOrdersArray = subOrdersRef;
    });
});