angular
.module('studentApp')
.service('studentData', studentData);

function studentData ($http) {


	var getstudents = function(){
		return $http.get('/api/student');
	};
	var getstudentdetails = function(id){
		return $http.get('/api/student/'+id);
	};
	var removestudent = function(id){
		return $http.post('/api/studentremove/'+id);
	};


	return {
		getstudents: getstudents,
		getstudentdetails: getstudentdetails,
		removestudent: removestudent
	};
}