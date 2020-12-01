const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const request = require("request")

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
const fname = req.body.fname
const lname = req.body.lname
const email = req.body.email

const data = {
  members: [{
    merge_fields: {
      FNAME: fname,
      LNAME: lname
    },
    email_address: email,
    status: "subscribed",
  }]
};

const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/3f3af267a5"
const options = {
  method: "POST",
  auth: "User:5a68a24cbe2f97e75c32a4e1103727a0-us8"
}

const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
  }
  else {
    res.sendFile(__dirname + "/failure.html")
  }


  response.on("data", function(data) {
  console.log(JSON.parse(data));
   });
})
// request.write(jsonData);
request.end();

})

app.post("/failure",function(req,res){
  return res.redirect('/')
})

app.listen(3000);

//API KEY
// d185ee1ce6b458ca1fd9223082f98deb-us8

//LIST-ID
// 3f3af267a5
