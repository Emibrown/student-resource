angular
.module('studentApp')
.controller('addCtrl', addCtrl);

function addCtrl ($scope, $uibModalInstance,$http) {
	$scope.student ={};
	$scope.createstud = "Create";
	$scope.modal = {
		close : function (result) {
			 $uibModalInstance.close(result);
		},
		cancel : function () {
			 $uibModalInstance.dismiss('cancel');
		}
	};

	$scope.create = function(){
       var uploadUrl = "/api/student";
       $scope.formError = "";
       $scope.createstud = "Creating...";
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
        	$scope.createstud = "Create"
      });
    };
}