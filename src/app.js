import express from "express";
import userRoutes from "../routes/user.js "
import AccountRoutes from "../routes/Accounts.js"
// import fs from "fs";


const app = express();
const PORT = process.env.PORT || 9000;


app.use(express.json())

// all routes in here are starting with "/users"
app.use("/users", userRoutes)
app.use("/Accounts",AccountRoutes)

// let data = JSON.parse(fs.readFileSync("./db/users.json"));
// console.log(data);


app.get("/", (req, res) => {
  res.send("home page");
});



app.listen(PORT, () => {
  console.log("server is up on port" + PORT);
});

// const addUser = (req, res) => {
//   data = [...data, ]; //add a new object to data
//   fs.writeFileSync("../db/users.json", JSON.stringify(data)); //convert js object to json
//   res.status(201).send(`user has been added`);
// };

// app.post("/users/", addUser);
