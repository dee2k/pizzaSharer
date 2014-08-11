'use strict';

app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $location) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
        login: function(provider) {
            return auth.$login(provider);
        },
        signedIn: function() {
            return auth.user !== null;
        },
        logout: function() {
            if (Auth.signedIn())
                auth.$logout();
        },
        getUid: function() {
            if (Auth.signedIn())
                return auth.user.uid;
        },
        getUsername: function() {
            if (Auth.signedIn())
                return auth.user.displayName;
        }
    };

    $rootScope.signedIn = function() {
        return Auth.signedIn();
    };

    $rootScope.logout = function() {
        Auth.logout();
        $location.path('/');
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(){
        if (Auth.signedIn())
            $rootScope.username = auth.user.displayName;
    });

    return Auth;
});