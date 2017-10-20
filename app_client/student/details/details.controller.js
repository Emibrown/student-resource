angular
.module('studentApp')
.controller('detailsCtrl', detailsCtrl);

function detailsCtrl ($scope,student, $uibModalInstance,studentData,$http) {
	$scope.id = student.id;
	$scope.modal = {
		cancel : function () {
			 $uibModalInstance.dismiss('cancel');
		}
	};
	$scope.student = {};
    function getstudentdetails(){
    	$scope.loader = true;
	     studentData
	      .getstudentdetails($scope.id)
	          .then(function (response) {
	             $scope.student = response.data;
	             $scope.loader = false;
	          },function (error) {
	              $scope.formError = error.data.message;
	              $scope.loader = false;
	          });
	  }
  	getstudentdetails();
}