var questions = require("./../server/controllers/questions.js");
var answers = require("./../server/controllers/answers.js");

module.exports = function(app) {

// ----- Questions
	app.post("/questions", function(req, res) {
		questions.create(req, res);
	});

	app.get("/questions", function(req, res) {
		questions.read(req, res);
	});

	app.get("/questions/:id", function(req, res) {
		questions.readOne(req, res);
	});

// ----- Answers
	app.post("/answers", function(req, res) {
		answers.create(req, res);
	});

// ----- Like Button
	app.post("/like", function(req, res) {
		answers.updateLike(req, res);
	});

	//--
	app.post('/create_user', function(req, res){
		answers.createUser(Req, res);
	});
};