'use strict';

app.factory('Order',
    function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + 'orders');

        var orders = $firebase(ref);

        var ordersArray = orders.$asArray();

        var Order = {
            all: orders,
            create: function(masterUid, username, name) {
                return ordersArray.$add({masterUid: masterUid, username:username, name:name});
            },
            find: function(orderId) {
                return ordersArray.$child(orderId);
            },
            delete: function(orderId) {
                return ordersArray.$remove(orderId);
            },
            addSubOrderToOrder: function(orderId, username, subOrder) {
                return ordersArray.child(orderId).child('num').$set('Dor');
            }
        };
        return Order;
});