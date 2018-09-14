var express=require("express");
var app=express();

var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/friendconnect",{ useNewUrlParser:true});

var userSchema=new mongoose.Schema({
	username:String,
	password:String
});
var i=0;

var user=mongoose.model("user",userSchema);
 

 app.get("/test",function(req,res){
 	user.findOne({ username:"rahul"},function(err,users){console.log(users)});
 	
 });

app.post("/verify",function(req,res){
	var username=req.body.username;
	var password=req.body.password;
	var u1={username,password};
	user.findOne(u1,function(err,user){
		if(user==null){

          res.render("home.ejs");
		}
		else{
			res.render("friend.ejs",{user:user});
			
		}

	});
});
app.post("/adduser",function(req,res){

var username=req.body.username;
	var password=req.body.password;
	var u1={username,password};
	user.create(u1,function(err,user){
		if(err){
         console.log("error!");
		}
		else{
			res.render("home.ejs");
		}
		

	});

});

app.get("/home",function(req,res){

    res.render("home.ejs");
});

app.get("/signup",function(req,res){
    res.render("signup.ejs");
});

app.get("*",function(req,res){
    res.send("hello!!")
});

app.listen("3030",function(){ console.log("friendconnect app started!")});