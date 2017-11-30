//****************************
// initialize Node Express App
//****************************
var express = require('express');
var app = express();
var http = require('http'),
	bodyParser = require('body-parser'),
	request = require('request');

app.set('port', process.env.PORT || 3000);
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//*****************
// Create DB Connection Here
//*****************
var sql = require('mssql');
var dbConfig = {
		user: '',// DB User
		password: '', // Your DB password
		server: '', // You can use 'localhost\\instance' to connect to named instance
		database: '',// DB Name

		options: {
				encrypt: true // Use this if you're on Windows Azure
		}
}

sql.connect(dbConfig, function (err) {
		if (err) console.log(err);
		else console.log("Connection Open");
});


//*****************
// Define Post URLs Here
//*****************
app.post('/collection_request', function (req, res) {
	res.send("");
});

//*****************
// Define Get URLs Here
//*****************

app.get('/', function(req, res) {
  res.send('Made With <3');
});

app.get('/get_data', function(req, res) {
	// create Request object
	var request = new sql.Request();
	// query to the database and get the records
	request.query("SELECT * FROM DB_name.[table_Name] WHERE id = 'xyz'", function (err, recordset) {
		if (err)return next(err);
    res.send(recordset.recordset[0]);

	});

});

//*****************
// Serve Listening
//*****************
http.createServer(app).listen(app.get('port'), function() {
   console.log("Server running at Port " + app.get('port'));
});
