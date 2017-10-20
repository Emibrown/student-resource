angular.module('studentApp', ['ngRoute','ui.bootstrap']);

function config ($routeProvider, $locationProvider) {
	
	$routeProvider
	.when('/', {
		templateUrl: '/student/home/home.view.html',
		controller: 'homeCtrl'
	})
	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);
}

angular
.module('studentApp')
.config(['$routeProvider', '$locationProvider', config]);
angular
.module('studentApp')
.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

