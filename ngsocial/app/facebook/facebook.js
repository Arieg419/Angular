'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1620014424938863'); //enter app id ,  get form fb
  $facebookProvider.setPermissions("email,public_profile, user_posts, publish_actions, user_photos");
})

.run(function($rootScope){
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
	$scope.isLoggedIn = false;

	$scope.login = function(){
		//$facebook is an angular facebook service

		$facebook.login().then(function(){ //this is logging in to fb
			$scope.isLoggedIn = true;
			refresh();
		});
	}

	$scope.logout = function(){
		$facebook.logout().then(function(){
			$scope.isLoggedIn = false;
			refresh();
		});
	}

	function refresh(){
		$facebook.api("/me" , { fields: 'last_name,first_name,email,gender,locale,name,link' }).then(function(response){
			$scope.welcomeMsg = "Welcome "+ response.name;
			$scope.isLoggedIn = true;
			$scope.userInfo = response;
			$facebook.api('/me/picture').then(function(response){
				$scope.picture = response.data.url;
				$facebook.api('/me/permissions').then(function(response){
					$scope.permissions = response.data;
					$facebook.api('/me/posts').then(function(response){
						console.log(response.data);
						$scope.posts = response.data; //used in front end
					});
				});
			});

			// $facebook.api('/460848457264912/attending').then(function(response){ //event id
			// 	//this is a promise
			// 	console.log(response.data);

			// 	var userDetails = {
			// 		id : "123",
			// 		name : "doe"
			// 	};

			// 	var n = 25; //defining an array of objects with javascript
			// 	//you get only 25 peoples
			// 	var sample = [];
			// 	for (var i = 0; i < n; i++)
   //  				sample.push(userDetails);
			

			// 	for (var i  = 0 ; i < 25 ; i++) {
			// 		sample[i].id = response.data[i].id;
			// 		sample[i].name = response.data[i].name;
			// 	}

			// 	// console.log('All user information' + sample);
			// });


			// https://graph.facebook.com/881883321891462/picture?type=large&width=720
			// the second one is how youre going to make the request to user photo

			//fields : {'about,address,bio,birthday,cover,devices,education,email,first_name,gender,hometown,id,interested_in,last_name,middle_name,political,religion,relationship_status,work'}

			// $facebook.api("/881883321891462", fields {'about,address,bio,birthday,cover,devices,education,email,first_name,gender,hometown,id,interested_in,last_name,middle_name,political,religion,relationship_status,work'}).then(function(response) {
			// 	console.log(response.data);
			// });

		},
		function(err){
			$scope.welcomeMsg = "Please Log In";
		});

	}

	$scope.postStatus = function() {
		var body  = this.body; //grabbing value from scope could also be $scope.body
		$facebook.api('/me/feed', 'post', {message : body}).then(function(response) {
			//specify post req
			$scope.msg = 'Thanks for Posting';
			refresh();
		});
	}

	refresh();
}]);