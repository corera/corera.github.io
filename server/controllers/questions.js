var mongoose = require("mongoose");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");

module.exports = (function() {
	return {
		create: function(req, res) {
			console.log(req.body);
			var errors = [];
			
			if(req.body.question.length < 10 ) {
				errors.push({ error: "Must be at least 10 characters" });
			}

			if(errors.length > 0 ) {
				res.json(errors);
			}
			else {
				var newQuestion = new Question(req.body);
				console.log(newQuestion);
				newQuestion.save(function(err, result) {
					if(!err) {
						res.json(result);
					}
				});
			}
		},
		read: function(req, res) {
			Question.find({}, function(err, result) {
				if(!err) {
					res.json(result);
				}
			});
		},
		readOne: function(req, res) {
			console.log(req.params.id);
			Question.find({_id: req.params.id})
					.populate("answers")
					.exec(function(err, result) {
						res.json(result);
					});
		}
	};
})();