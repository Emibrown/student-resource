angular
.module('studentApp')
.controller('editCtrl', editCtrl);

function editCtrl ($scope,student,studentData,$uibModalInstance,$http) {
	$scope.student = {};
	$scope.id = student.id;
	$scope.updatestud = "Update";

	$scope.modal = {
		close : function (result) {
			 $uibModalInstance.close(result);
		},
		cancel : function () {
			 $uibModalInstance.dismiss('cancel');
		}
	};

	
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

	
	$scope.update = function(){
       var uploadUrl = "/api/editstudent/"+$scope.id;
       $scope.formError = "";
       $scope.createstud = "Updating...";
       var fd = new FormData();
       for(var key in $scope.student)
       		fd.append(key, $scope.student[key]);
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       }).then(function (response) {
           $scope.modal.close(response.data);
      }, function (error) {
         	$scope.formError = error.data.message;
        	$scope.updatestud = "Update"
      });
    };
}