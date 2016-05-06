app.controller('HomeController', function($scope, $http) {
      

});


app.directive('addDivDirective', function() {
  return {
    restrict: 'A',
    scope: true,
    template: '<button id="addDiv" class="btn btn-default" ng-click="click()"> + </button>',
    controller: function($scope, $element, $compile) {
      $scope.clicked = 0;
      var page = '<li id="pages">    <button type="button" class="btn btn-secondary"> <span contenteditable="true"> Page </span>  </button> <div add-div-directive></div> </li>';

      $scope.click = function() {
        $('#pages').append($compile(page)($scope));
      }
    }
  }
});
