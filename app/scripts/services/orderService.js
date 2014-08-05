'use strict';

app.factory('Order',
    function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + 'orders');

        var orders = $firebase(ref);

        var Order = {
            all: orders.$asArray,
            create: function(order) {
                return orders.$add(order);
            },
            find: function(orderId) {
                return orders.$child(orderId);
            },
            delete: function(orderId) {
                return orders.$remove(orderId);
            }
        };
        return Order;
    });