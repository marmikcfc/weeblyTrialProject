// angular routing
var app = angular.module('BoilerplateApp', ['ngRoute', 'ngMaterial', 'ngFileUpload']);

// run for every route changes, to check if the next route is private or not
app.run(function($rootScope, $location, $http) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    var privateViews = []; // include private views/routes, as "views/private.html"
    // if the url is private
    if (privateViews.indexOf(next.templateUrl) > -1) {
      // check if user is logged in
      // if NOT logged in redirect to login page
      $http.get("/loggedIn")
      .success(function(data) {
        if (!data) {
          $location.path("/login");
        }
      })
      .error(function(err) {
        console.log("An error occured: " + err);
      })
    }
  });
});


// route provider to redirect the user to the requested view, using a single page application setup
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
    controller: 'IndexController',
    templateUrl: 'views/login.html'
  })
  .when('/signup', {
    controller: 'IndexController',
    templateUrl: 'views/signup.html'
  })
    .when('/dashboard', {
    controller: 'DashboardController',
    templateUrl: 'views/dashboard.html'
  })
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  });

  // use the HTML5 History API
  // this line is needed because the SPA urls would show # characters otherwise. It also needs line 6 in index.html
  $locationProvider.html5Mode(true);
});

// to call when you want to check if the user is online

app.factory('userFactory', function($http, $window){
  var user = {};
  var error = {};
  return{
    createUser : function(input, callback){
      console.log('factory trying to create the user', input);
      $http.post('/users', input).then(function(response){
        console.log(response);
      })
    },
    loginUser: function(input, callback){
      user = {};
      error = {};
      console.log('factory trying to log in with', input);
      $http.post('/login', input).then(function(response){
        console.log(response);
        if(response.data.err){
          console.log('error!');
          error.message = response.data.err;
          console.log(error);
          callback(response.data);
        } else {
          user = response.data.data;
          callback(response.data.data);
        }
      })
    },
    getUser: function(callback){
      callback(user);
    },
    logoutUser: function(){
      user = {};
      $http.post('/logout').then(function(response){
        console.log(response);
      })
    },
    checkLogin: function(callback){
      $http.get('/loggedin').then(function(response){
        console.log(response);
        if(response.data){
          console.log('there is a user');
          user = response.data;
          callback(response);
        } else {
          console.log('no user!');
          callback(response);
        }
      })
    },

    getAllUsers: function (callback){
      $http.get('/getAllUsers').success(function(output){
        console.log(output, 'output in user factory');
        callback(output);
      })
    },

    addFriend: function(friend, user, callback){
      console.log(user, 'current user in user')
      console.log('factory trying to add friend to the user', friend);
      $http.post('/addFriend', friend).then(function(response){
        // console.log(response);
      })
    }
  }
})
