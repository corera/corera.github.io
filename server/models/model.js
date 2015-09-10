var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = mongoose.Schema({
	user: String,
	question: String,
	description: String,
	created_at: { type: Date, default: Date.now },
	answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

var AnswerSchema = mongoose.Schema({
	_question: {type: Schema.ObjectId, ref: 'Question'},
	user: String,
 	answer: String,
 	description: String,
 	like: Number,
 	created_at: { type: Date, default: Date.now }
});

var Question = mongoose.model("Question", QuestionSchema);
var Answer = mongoose.model("Answer", AnswerSchema);
