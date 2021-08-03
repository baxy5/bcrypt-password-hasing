const bcrypt = require("bcrypt");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://<username>:<password>@cluster0.ov4ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let password = "password123";

function passwordValidation(result) {
  if (result) {
    console.log("Nice");
  } else {
    console.log("Not nice!");
  }
}

MongoClient.connect(url, (err, db) => {
  if (err) throw err;

  let dbo = db.db("mydb");
  dbo.collection("admin-login-data").findOne({}, (err, res) => {
    if (err) throw err;

    const databasePassword = res.password;

    bcrypt.compare(password, databasePassword, (err,res)=>{
        passwordValidation(res);
    })

    db.close();
  });
});
