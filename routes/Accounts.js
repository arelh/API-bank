import express from "express";
const router = express.Router();
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

let Accounts = JSON.parse(fs.readFileSync("../db/Accounts.json"));

router.get("/", (req, res) => {
  try {
    // console.log(Accounts);
    res.send(Accounts);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const readAccounts= (req, res) => {
    try {
      const { id } = req.params;
      const foundAccounts = Accounts.find((Account) => Account.id === +id);
      res.send(foundAccounts);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
router.get("/:id",readAccounts );




const addAccount= (req, res) => {
    try {
      console.log("post route reached");
      const Account = req.body;
      Accounts.push( ...Account );
      fs.writeFileSync("../db/Accounts.json", JSON.stringify([...Accounts]));
      res.send(`Account added to the data base`);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }

router.post("/", addAccount );



const deleteAccount=(req, res) => {
    try {
      const { id } = req.params;
      Accounts = Accounts.filter((Account) => Account.id !== +id);
      fs.writeFileSync("../db/Accounts.json", JSON.stringify([...Accounts]));
      res.send(`Account with the id ${id} deleted to the data base`);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
router.delete("/:id",deleteAccount );

const editAccount= (req, res) => {
    try {
      const { id } = req.params;
      const { cash, credit } = req.body;
      const AccountHasChange = Accounts.find((Account) => Account.id === +id);
      if (cash) {
        AccountHasChange.cash = cash;
      }
      if (credit) {
        AccountHasChange.credit = credit;
      }
      res.send(`Account with the id ${id} updated `);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }


router.patch("/:id", editAccount );




export default router;
