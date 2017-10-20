angular
.module('studentApp')
.controller('homeCtrl', homeCtrl);

function homeCtrl ($scope,$uibModal,$route,studentData) {

	$scope.students = [];
    function getstudents(){
    	$scope.loader = true;
	     studentData
	      .getstudents()
	          .then(function (response) {
	             $scope.students = response.data;
	             $scope.loader = false;
	          },function (error) {
	              $scope.formError = error.data.message;
	          });
	  }
  	getstudents();

  	$scope.removestudent = function (id){
	     studentData
	      .removestudent(id)
	          .then(function (response) {
	             for (var i = $scope.students.length - 1; i >= 0; i--) {
	             	if( $scope.students[i]._id == id){
	             		$scope.students.splice(i,1);
	             	}
	             }
	          },function (error) {
	              return;
	          });
	};

	$scope.popupadd = function () {
			var modalInstance = $uibModal.open({
				templateUrl: '/student/add/add.view.html',
				controller: 'addCtrl',
			});

			modalInstance.result.then(function (data) {
				$scope.students.push(data);
			});
		};

	$scope.popupedit = function (id) {
			var modalInstance = $uibModal.open({
				templateUrl: '/student/edit/edit.view.html',
				controller: 'editCtrl',
				resolve : {
					student : function () {
						return {
							id : id
						};
					}
				}
			});

			modalInstance.result.then(function (data) {
				for (var i = 0; i < $scope.students.length; i++) {
					if ($scope.students[i].matricNo == data.matricNo) {
							$scope.students[i].department = data.department;
							$scope.students[i].avatar = data.avatar;
							break;
					}
				}
			});
		};

	$scope.popupdetails = function (id) {
		var modalInstance = $uibModal.open({
			templateUrl: '/student/details/details.view.html',
			controller: 'detailsCtrl',
			resolve : {
					student : function () {
						return {
							id : id
						};
					}
				}
		});
	};


	
}