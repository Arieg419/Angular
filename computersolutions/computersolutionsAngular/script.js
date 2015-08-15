// Code goes here, array brackets in declarations are to declare dependencies
var app = angular.module("computer", ["ngRoute"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
   when('/main', {
    templateUrl: 'main.html',
    controller: 'MainCtrl'
   }).
   when('/about', {
    templateUrl: 'about.html',
    controller: 'MainCtrl' //no dynamic content
   }).
   when('/services', {
    templateUrl: 'services.html',
    controller: 'ServicesCtrl'
   }).
   when('/contact', {
    templateUrl: 'contact.html',
    controller: 'ContactCtrl'
   }).
   otherwise({redirectTo: '/main'});
}]) //chaining method could have just done app.config();

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) { //injeting dep for controler
   $http.get('services.json').then(function(response) {
    $scope.services = response.data;
  });
}])

.controller('ServicesCtrl', ['$scope','$http', function($scope, $http) { //injeting dep for controler
  $http.get('services.json').then(function(response) {
    $scope.services = response.data;
  });
}])

.controller('ContactCtrl', ['$scope','$http', function($scope, $http) { //injeting dep for controler
  $http.get('locations.json').then(function(response) {
    $scope.locations = response.data;
  });
}])