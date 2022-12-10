import express from "express";
const router = express.Router();
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

let users = JSON.parse(fs.readFileSync("./db/users.json"));
router.get("/", (req, res) => {
  try {
    // console.log(users);
    res.send(users);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const readUsers= (req, res) => {
    try {
      const { id } = req.params;
      const foundUsers = users.find((user) => user.id === +id);
      res.send(foundUsers);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
router.get("/:id",readUsers );

const addUser=(req, res) => {
    try {
      console.log("post route reached");
      const user = req.body;
      users.push( ...user);
      fs.writeFileSync("./db/users.json", JSON.stringify([...users]));
      res.send(`user added to the data base`);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
router.post("/",addUser );

const deleteUser=(req, res) => {
    try {
      const { id } = req.params;
      users = users.filter((user) => user.id !== +id);
      fs.writeFileSync("./db/users.json", JSON.stringify([...users]));
      res.send(`user with the id ${id} deleted to the data base`);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
router.delete("/:id",deleteUser );

const editUser= (req, res) => {
    try {
      const { id } = req.params;
      const { name, age } = req.body;
      const userHasChange = users.find((user) => user.id === +id);
      if (name) {
        userHasChange.name = name;
      }
      if (age) {
        userHasChange.age = age;
      }
      res.send(`user with the id ${id} updated `);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }


router.patch("/:id", editUser );

export default router;
