export const readUsers= (req, res) => {
    try {
      const { id } = req.params;
      const foundUsers = users.find((user) => user.id === +id);
      res.send(foundUsers);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

 export const addUser=(req, res) => {
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

 export const deleteUser=(req, res) => {
    try {
      const { id } = req.params;
      users = users.filter((user) => user.id !== +id);
      fs.writeFileSync("./db/users.json", JSON.stringify([...users]));
      res.send(`user with the id ${id} deleted to the data base`);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

 export const editUser= (req, res) => {
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

//   import {readUsers,addUser,deleteUser,editUser} from "../controllers/UserFunc.js"
