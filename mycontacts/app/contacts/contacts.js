'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

//Contacts Controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
	//Init FireBase
	var ref = new Firebase('https://mycontacts-app4.firebaseio.com/contacts');
	
	//get Contacts
	//adding contacts to end of url to sepcify contacts collection
	$scope.contacts = $firebaseArray(ref);
	// console.log($scope.contacts);

	// Show Add Form
	$scope.showAddForm = function() {
		$scope.addFormShow = true;
	}

	// Show Edit Form
	$scope.showEditForm = function(contact) {
		$scope.editFormShow = true;

		$scope.id = contact.$id; //Firebase thing?
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
	}

	// Hide Forms
	$scope.hide = function() {
		$scope.addFormShow = false;
		$scope.contactShow = false;
	}

	//Submit Contact
	$scope.addFormSubmit = function() {
		if($scope.name) { var name  = $scope.name; } else { var name = null ; }
		if($scope.email) { var email  = $scope.email; } else { var email = null ; }
		if($scope.company) { var company  = $scope.company; } else { var company = null ; }
		if($scope.mobile_phone) { var mobile_phone  = $scope.mobile_phone; } else { var mobile_phone = null ; }
		if($scope.home_phone) { var home_phone  = $scope.home_phone; } else { var home_phone = null ; }
		if($scope.work_phone) { var work_phone  = $scope.work_phone; } else { var work_phone = null ; }
		if($scope.street_address) { var street_address  = $scope.street_address; } else { var street_address = null ; }
		if($scope.city) { var city  = $scope.city; } else { var city = null ; }
		if($scope.state) { var state  = $scope.state; } else { var state = null ; }
		if($scope.zipcode) { var zipcode  = $scope.zipcode; } else { var zipcode = null ; }

		// Build out Object
		// $add is a angularFire method used for adding an entry to Firebase local reference.
		$scope.contacts.$add({
			name: name,
			email: email,
			company: company, 
			phones: [
				{
					mobile: mobile_phone,
					home: home_phone,
					work: work_phone
				}
			],
			address: [
				{
					street_address: street_address,
					city: city,
					state: state,
					zipcode: zipcode
				}
			]
		}).then(function(ref) {
			var id = ref.key();
			console.log("Added contact with ID:" + id);

			// Clear Form
			clearFields();

			// Hide Form
			$scope.addFormShow = false;

			// Send Message to the User
			$scope.msg = "Contact has been added.";

		});
	}

	//Edit Form
	$scope.editFormSubmit = function(contact) {
		console.log("Editing contact");

		//Get ID
		var id = $scope.id; //Firebase thing?

		//Get Record
		var record = $scope.contacts.$getRecord(id);

		//assign values
		record.name = $scope.name;
		record.email = $scope.email;
		record.company = $scope.company;
		record.phones[0].work = $scope.work_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].mobile = $scope.mobile_phone;
		record.address[0].street_address = $scope.street_address;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zipcode = $scope.zipcode;

		//Saving to Firebase
		$scope.contacts.$save(record).then(function(ref) {
			console.log(ref.key);
		});

		clearFields();

		//Hide Edit Form
		$scope.editFormShow = false;

		$scope.msg = "Contact Updated."

	}
	//all of ng model in html is binded to the scope?

	// Showing Contact
	$scope.showContact = function(contact) {
		console.log('Getting contact...lmao');
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.work_phone = contact.phones[0].work;
		$scope.home_phone = contact.phones[0].home;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;
		$scope.contactShow = true;
	}

	$scope.removeContact = function(contact) {
		console.log('Removing Contact..');

		$scope.contacts.$remove(contact);

		$scope.msg = "Contact Removed";
	}

	function clearFields() {
		console.log("Clearing all fields...");

		$scope.name = '';
		$scope.email = '';
		$scope.company = '';
		$scope.mobile_phone = '';	
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street_address = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zipcode = '';
	}
}]);

//have to have value for everything in order to submit to firebase
//if no value was passed we will set to null
//want to work with firebaseArray, more in depth documentation on firebaseArray or firebaseObject online.