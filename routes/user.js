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

const readUsers = (req, res) => {
  try {
    const { id } = req.params;
    const foundUsers = users.find((user) => user.id === +id);
    res.send(foundUsers);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

router.get("/:id", readUsers);

const updateJson = () => {
  fs.writeFileSync("./db/users.json", JSON.stringify([...users]));
};

const addUser = (req, res) => {
  try {
    console.log("post route reached");
    const user = req.body;
    users.push(...user);
    updateJson();
    res.send(`user added to the data base`);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
router.post("/", addUser);

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    users = users.filter((user) => user.id !== +id);
    fs.writeFileSync("./db/users.json", JSON.stringify([...users]));
    res.send(`user with the id ${id} deleted to the data base`);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
router.delete("/:id", deleteUser);

const editUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, cash, credit } = req.body;
    const userHasChange = users.find((user) => user.id === +id);
    if (name) {
      userHasChange.name = name;
    }
    if (cash) {
      userHasChange.cash = cash;
    }
    if (credit) {
      userHasChange.credit = credit;
    }
    updateJson();
    res.send(`user with the id ${id} updated `);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

router.patch("/:id", editUser);

router.post("/:id/deposit", (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const cashAmount = req.body.cashAmount;
    const userToDeposite = users.find((user) => user.id === +id);
    userToDeposite.cash += cashAmount;
    console.log(userToDeposite);
    updateJson();
    res.send(`user update the cash`);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/:id/credit", (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const credit = req.body.credit;
    const userToUpdatedCredit = users.find((user) => user.id === +id);
    userToUpdatedCredit.credit = credit;
    console.log(userToUpdatedCredit);
    updateJson();
    res.send(`user update the credit`);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/:id/Withdraw", (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const withdraw = req.body.withdraw;
    const userToWithdraw = users.find((user) => user.id === +id);

    if (withdraw > userToWithdraw.cash + userToWithdraw.credit) {
      res.send("Overdraft");
    } else {
      userToWithdraw.cash -= withdraw;
      console.log(userToWithdraw);
      updateJson();
      res.send("Successfully pulled ");
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post("/:id/Transferring", (req, res) => {
    try{
        console.log(req.body);
        const  {id}  = req.params;
        const  idToWithdraw  = req.body.idToWithdraw;
        const amount= req.body.amount;
        const userToDeposite = users.find((user) => user.id === +id);
        const userToWithdraw = users.find((user) => user.id === +idToWithdraw);
        if(amount-1<userToDeposite.cash+userToDeposite.credit){
            userToDeposite.cash-=amount
            userToWithdraw.cash+=amount
            console.log(userToDeposite);
            console.log(userToWithdraw);
            console.log(amount);
        }
        else{
            res.send("You cannot transfer more money than you have in your account")
        }
       
        updateJson()
        res.send("Successfully transfer ");
    }
    catch (e) {
        res.status(400).send({ error: e.message });
      }
})
export default router;
