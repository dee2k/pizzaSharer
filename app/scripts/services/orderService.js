'use strict';

app.factory('Order',
    function ($firebase, FIREBASE_URL, $q) {
        var ref = new Firebase(FIREBASE_URL + 'orders');
        var orders = $firebase(ref);

        var Order = {
            create: function(masterUid, username, name) {
                    var OrderObject = {
                        ownerid: masterUid,
                        username: username,
                        ordername: name
                    };
                    var ref = orders.$ref();
                    var pushId = ref.push().name();
                    var def = $q.defer();
                    ref.child(pushId).setWithPriority(OrderObject, masterUid, function(err) {
                        if( err ) { def.reject(err); }
                        else { def.resolve(ref.child(pushId)); }
                    });
                    return def.promise;
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