'use strict';

var app = angular.module('pizzaSharerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
    'firebase'
])
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/order', {
            templateUrl: 'views/order.html',
            controller: 'OrderCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

.constant('FIREBASE_URL', "https://sharpizza.firebaseio.com/");