////////////////////////////////
// ---------- Configs -----------
////////////////////////////////

var myApp = angular.module('myApp', ['ngRoute']);

	myApp.config(function($routeProvider) {
		$routeProvider
		.when("/", {
			templateUrl: "partials/home.html"
		})
		.when("/new_question", {
			templateUrl: "partials/new_question.html"
		})
		.when("/question/:id", {
			templateUrl: "partials/question.html"
		})
		.when("/question/:id/new_answer", {
			templateUrl: "partials/new_answer.html"
		})
		.otherwise({
			templateUrl: "/"
		});
	});


////////////////////////////////
// ---------- Factory ----------
////////////////////////////////

myApp.factory("myAppFactory", function($http) {
	var factory = {};
	var questions = [];
	var question = {};
	factory.user = "";

	factory.createQuestion = function(newQuestion, callback) {
		newQuestion.user = factory.user;
		$http.post("/questions", newQuestion).success(function(data) {
			if(angular.isArray(data)) {
				callback(data, null);
			}
			else {
				console.dir("success:", data);
				questions.push(data);
				callback(null, data);
			}
		});
	};

	factory.readQuestion = function(callback) {
		$http.get("/questions").success(function(data) {
			questions = data;
			callback(questions);
		});
	};

	factory.readOneQuestion = function(questionId, callback) {
		$http.get("/questions/" + questionId.id).success(function(data) {
			question = data;
			callback(question);
		});
	};

	factory.createAnswer = function(newAnswer, callback) {
		newAnswer.user = factory.user;
		$http.post("/answers", newAnswer).success(function(data) {
			console.log("huehue");
			if(angular.isArray(data)) {
				callback(data, null);
			}
			else {
				console.dir("success:", data);
				questions.push(data);
				callback(null, data);
			}
		});
	};

	factory.updateLike = function(selectedAnswer, callback) {
		$http.post("/like", selectedAnswer).success(function(data) {
			callback(data);
		});
	};

	return factory;
});



////////////////////////////////
// ---------- Controller -------
////////////////////////////////

// var user;

myApp.controller("myAppController", function($scope, myAppFactory, $location, $routeParams) {

	// localStorageService
	// $scope.user = prompt();
    
	myAppFactory.user = $scope.user;
	$scope.predicate = "-created_at";

	myAppFactory.readQuestion(function(data) {
		$scope.questions = data;
	});
	$scope.isError = false;


	function create_user(){
		user = {user_name: user_name};
		$http.post('/create_user', user).success(function(server_response){
			//console.log(server_response);
			current_user = server_response;
		});
	}	 


	$scope.createQuestion = function(newQuestion) {
		$scope.isError = false;
		myAppFactory.createQuestion(newQuestion, function(err, data) {
			if(err !== null) {
				$scope.isError = true;
				$scope.errors = err;
				console.log(err);
			}
			else {
				console.log("success");
				$scope.isError = false;
				$scope.errors = [];
				$location.path("/");
			}
		});
	};

	myAppFactory.readOneQuestion($routeParams, function(data, answers) {
		$scope.question = data[0];
		$scope.answers = data[0].answers;
		$scope.predicate = "-like";
		console.log("$scope.question, specific", $scope.question);
	});

	$scope.updateLike = function(selectedAnswer) {
		myAppFactory.updateLike(selectedAnswer, function(data) {
			console.log("updatedAnswer", data);
			$scope.answers[$scope.answers.indexOf(selectedAnswer)] = data;
		});
	};

	console.log("newAnswer params", $routeParams);
	$scope.isError = false;
	$scope.params = $routeParams.id;

	$scope.createAnswer = function(newAnswer) {
		$scope.isError = false;
		newAnswer.questionId = $routeParams.id;
		console.log("Create Answer :", newAnswer);
		myAppFactory.createAnswer(newAnswer, function(err, data) {
			if(err !== null) {
				$scope.isError = true;
				$scope.errors = err;
				console.log(err);
			}
			else {
				console.log("success");
				$scope.isError = false;
				$scope.errors = [];
				$location.path("/question/" + $routeParams.id);
			}
		});
	};
});



////////////////////////////////
// ---------- Random -------
////////////////////////////////

