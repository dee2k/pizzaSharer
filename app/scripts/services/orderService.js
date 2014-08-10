'use strict';

app.factory('Order',
    function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + 'orders');
        var orders = $firebase(ref);

        var Order = {
            create: function(masterUid, username, name) {
                    var OrderObject = {
                        ownerid: masterUid,
                        username: username,
                        ordername: name
                    };
                    return orders.$push(OrderObject);
            },
            addSubOrderToOrder: function(ref, uid, displayname, subOrder) {
                angular.forEach(subOrder, function(value){
                    var suborder = {
                        userid: uid,
                        displayname: displayname,
                        numslices: value.num,
                        slicetype: value.type
                    };
                    var newref = new Firebase(ref + '/suborders');
                    var suborders = $firebase(newref);
                    suborders.$push(suborder);
                });
            }
        };


        return Order;
});