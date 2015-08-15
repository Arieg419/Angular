'use strict';

// Declare app level module which depends on views, and components
angular.module('ngSocial', [
  'ngRoute',
  'ngSocial.view1',
  'ngSocial.view2',
  'ngSocial.facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);

// var express = require('express');
// var app = express();
// app.use(express.static(__dirname + '/app'));
// app.listen(process.env.PORT || 3000);