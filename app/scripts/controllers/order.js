'use strict';

app.controller('OrderCtrl', function($scope, $firebase, FIREBASE_URL, $location, $routeParams, Auth, Order){
    var orderId = $routeParams.orderid,
        ref = new Firebase(FIREBASE_URL + 'orders/' + orderId),
        subRef = new Firebase(FIREBASE_URL + 'orders/' + orderId + '/suborders/'),
        orderRef = $firebase(ref).$asObject(),
        subOrdersRef = $firebase(subRef).$asArray(),
        orderLoaded = false,
        subOrderLoaded = false;

    $scope.numbersArray = [1,2,3,4,5];
    $scope.typesArray = ["Olives","Onions", "Mushrooms"];
    $scope.subOrders = [];

    $scope.addSubOrder = function() {
        $scope.subOrders.push({num: $scope.numSlices, type: $scope.sliceType});
        if ($scope.isOrderView()){
            Order.addSubOrderToOrder(ref, Auth.getUid(), Auth.getUsername(), $scope.subOrders);
            $scope.subOrders = [];
        }
    };

    $scope.deleteSubOrder = function(index) {
        $scope.subOrders.splice(index,1);
    };

    $scope.shareOrder = function(){
        if (Auth.signedIn()) {
            Order.create(Auth.getUid(), Auth.getUsername(), $scope.order.name).then(function(ref){
                var orderId = new Firebase(ref).name();
                Order.addSubOrderToOrder(ref, Auth.getUid(), Auth.getUsername(), $scope.subOrders);
                $scope.subOrders = [];
                $location.path('/orders/' + orderId);
            });
        }
    };

    $scope.isOrderView = function() {
        return orderId;
    };

    $scope.isOwner = function(){
        if (orderLoaded && orderId) {
            return (Auth.signedIn() && Auth.getUid() === $scope.order.ownerid) ? true : false;
        }
    };

    orderRef.$loaded().then(function(){
        $scope.order = orderRef;
        orderLoaded = true;
    });

    subOrdersRef.$loaded().then(function(){
        $scope.subOrdersArray = subOrdersRef;
        subOrderLoaded = true;
    });
});