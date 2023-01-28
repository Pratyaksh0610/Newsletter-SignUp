const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  console.log("reached");
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (request, response) {
  var firstName = request.body.fname;
  var lastName = request.body.lname;
  var email = request.body.emadd;
  const listId = "f82216eed6";

  mailchimp.setConfig({
    apiKey: "db5f224474c2fbb3ef0840d53df12ac0-us21",
    server: "us21",
  });

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const run = async () => {
    try {
      const response = await mailchimp.lists.setListMember(
        "f82216eed6",
        "subscriber_hash",
        {
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        }
      );
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (e) {
      console.log(e.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };
  run();
});

app.listen(3000, function () {
  console.log("Server started at 3000");
});

//id f82216eed6
//api db5f224474c2fbb3ef0840d53df12ac0-us21
