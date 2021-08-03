const bcrypt = require("bcrypt");
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://<username>:<password>@cluster0.ov4ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const saltRounds = 10;
let password = "password123";


// Hash + Salt then store the password in the database
bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;

      let myobj = {
        username: "admin",
        password: hash,
      };

      let dbo = db.db("mydb");
      dbo.collection("admin-login-data").insertOne(myobj, (err, res) => {
        if (err) throw err;

        console.log("hashed pw added");
        db.close();
      });
    });
  });
});
