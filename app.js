//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://0.0.0.0:27017/userDB" , {useNewUrlParser : true});
const userSchema = {
  email : String,
  password : String
};

const User = mongoose.model("User" , userSchema);

app.get("/" , function(req,res){
  res.render("home");
});

app.get("/register" , function(req,res){
  res.render("register");
});

app.get("/login" , function(req,res){
  res.render("login");
});

app.post("/register" , function(req,res){
  const newUser = new User({
    email : req.body.username,
    password : req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");
    }
  });
});

app.post("/login" , function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email : username} , function(err , foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("secrets");
        }
      }
    }
  });
});

app.listen("3000" , function(req,res){
  console.log("port running on server 3000");
});
