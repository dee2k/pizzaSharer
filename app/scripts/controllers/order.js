'use strict';

app.controller('OrderCtrl', function($scope, $firebase, FIREBASE_URL, $location, $routeParams, Auth, Order){
    var orderId = $routeParams.orderid,
        ref = new Firebase(FIREBASE_URL + 'orders/' + orderId),
        subRef = new Firebase(FIREBASE_URL + 'orders/' + orderId + '/suborders/'),
        orderRef = $firebase(ref).$asObject(),
        subOrdersRef = $firebase(subRef).$asArray(),
        orderLoaded = false,
        subOrderLoaded = false;

    // Arrays for select boxes
    // and array for user sub-orders
    $scope.numbersArray = [1,2,3,4,5];
    $scope.typesArray = ["Olives","Onions", "Mushrooms"];
    $scope.subOrders = [];

    // Variables for generating the order
    $scope.slicesMap = {};
    $scope.pizzasArray = [];
    $scope.totalSlices = 0;
    $scope.dividePizzaBy = 8;


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
                Order.addSubOrderToOrder(ref, Auth.getUid(), Auth.getUsername(), $scope.subOrders);
                $scope.subOrders = [];
                $location.path('/orders/' + ref.name());
            }, function(err){
                console.log('error'+err);
            });
        }
    };

    $scope.generateOrder = function(){
        // Init the slices map and total slices
        $scope.totalSlices = 0;
        angular.forEach($scope.typesArray, function(value){
            $scope.slicesMap[value] = 0;
        });
        // Set and sum number of total slices
        angular.forEach($scope.subOrdersArray, function(value){
            $scope.slicesMap[value.slicetype] += value.numslices;
            $scope.totalSlices += value.numslices;
        });
        // Error if not enough slices to divide by
        if ($scope.totalSlices % $scope.dividePizzaBy !== 0){
            console.log('error not enough slices ' + JSON.stringify($scope.slicesMap) + ' total ' + $scope.totalSlices);
            return;
        }

        var total = $scope.totalSlices;
        var divideBy = $scope.dividePizzaBy;

        // Populate the pizzas
        while (total !== 0) {
            angular.forEach($scope.slicesMap, function(value, key){
                while (value !== 0 && value % divideBy === 0 || value-divideBy >= 0){
                    console.log('In while loop ' + JSON.stringify($scope.slicesMap) + ' total ' + total);
                    value -= divideBy;
                    total -= divideBy;
                    var newPizza = {
                        type: key,
                        size: divideBy / $scope.dividePizzaBy,
                        names: "None"
                    };
                    $scope.pizzasArray.push(newPizza);
                }
            });
            divideBy /= 2;
            console.log('After inner while loop ' + JSON.stringify($scope.slicesMap) + ' total ' + total);
            console.log('total is ' + total + ' divideby is ' + divideBy);
            //break;
        }

        // Log the "pizzas" array
        angular.forEach($scope.pizzasArray, function(value, key){
            console.log('Pizzas array, value is ' + JSON.stringify(value) + ' Key is ' + key);
        });
    };

    $scope.isOrderView = function() {
        return (orderId && subOrderLoaded);
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