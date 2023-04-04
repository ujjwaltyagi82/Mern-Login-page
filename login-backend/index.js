const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Ujju7982:jiOpJXHdr8UNZvNj@cluster0.y5didvs.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("mongo is working"))
    .catch(error => console.log(error))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
});

app.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const user = await User.findOne({ email: email });
  
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        await newUser.save();
        res.send({ message: "Successfully Registered, Please login now." });
      }
    } catch (err) {
      res.send(err);
    }
  });

const Port = 3001

app.listen(Port, () => {
    console.log(`express is running on ${Port}`)
})