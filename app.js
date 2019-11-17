//jshint esversion: 6

//initialize
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//code
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]

  };
  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/10a5f1c2bf",
    method: "POST",
    headers: {
      "Authorization": "glen1 52d681d3be58050ecba1e24e2613765d-us5"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error){
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

  console.log(firstName, lastName, email);
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/success", function(req, res){
  res.redirect("/");
});

//52d681d3be58050ecba1e24e2613765d-us5

//10a5f1c2bf
