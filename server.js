var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
app = express();

app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require("./config/mongoose.js");
require("./config/routes.js")(app);

app.listen(8000, function() {
	console.log("Port 8000 ACTIVATED");
});