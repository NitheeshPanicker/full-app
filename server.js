var express = require("express");
var bp = require("body-parser");
var app = express();
var fs = require("fs");

app.use(express.static(__dirname+"/public"));
app.use(bp.json());

app.get("/data", function(request, response){
	fs.readFile("data/heroes.json", function(error, data){
		if(error){
			console.log(error)
		}else{
			response.send(JSON.parse(data.toString()));
		}
	})
});

app.post("/data", function(request, response){
	// console.log("i got some data");
	console.log(request.body);
	var herodata = null;
	fs.readFile("data/heroes.json", function(error, data){
		if(error){
			console.log(error)
		}
		herodata = JSON.parse(data.toString());
		
		herodata.heroes.push(request.body);
		/*
		console.log(herodata)
		 */
		fs.writeFile("data/heroes.json", JSON.stringify(herodata), function(error){
			response.send("new hero added");
		});
		
	})
	
	
});

app.listen(5555, function(){
	console.log("your server is now running on port 5555");
});
