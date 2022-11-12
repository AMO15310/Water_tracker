const db = require("../config/config");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validators = require("../validators/schema");

const getUsers = (req, res) => {
  try {
    db.query(`SELECT * FROM users`, (err, response) => {
      if (err) return console.log({ err });
      return res.json(response);
    });
  } catch (error) {
    res.status(200).json(error);
  }
};

const postUser = async (req, res) => {
  try {
    const id = uuid4();
    const {
      name,
      meterNumber,
      contact,
      initialUnits,
      finalUnits,
      consumedUnits,
      unitCost,
      totalCost,
      paid,
      balance,
    } = req.body;
    const { error, value } = validators.schema_1.validate(req.body);
    if (error) {
      res.json(error.details[0].message);
    }
    const values = {
      id,
      name,
      meterNumber,
      contact,
      initialUnits,
      finalUnits,
      consumedUnits,
      unitCost,
      totalCost,
      paid,
      balance,
    };

    let query = `INSERT INTO Users SET ?`;
    db.query(query, values, (err, resp) => {
      if (err) console.log(err);
      res.json({ message: `Record inserted successfully`, resp });
      return;
    });
  } catch (error) {
    // res.json(error);
  }
};

const delUser = (req, res) => {
  const id = req.params.id;
  try {
    db.query(`DELETE FROM Users WHERE id = '${id}'`, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      res.json(`Record deleted successfully`);
    });
  } catch (error) {}
};

const updateTable = (req, res) => {
  const id = req.params.id;
  const {
    name,
    meterNumber,
    contact,
    initialUnits,
    finalUnits,
    consumedUnits,
    unitCost,
    totalCost,
    paid,
    balance,
  } = req.body;
  try {
    const { err, values } = validators.schema_1.validate(req.body);
    if (err) {
      res.json(err);
      return;
    }
    // res.json(values);
    const values2 = {
      name,
      meterNumber,
      contact,
      initialUnits,
      finalUnits,
      consumedUnits,
      unitCost,
      totalCost,
      paid,
      balance,
    };
    let query = `UPDATE users SET ? WHERE id = '${id}'`;
    db.query(query, values2, (error, resp) => {
      if (error) {
        return console.log(error);
      }
      res.json({ message: `Record inserted successfully`, resp });
    });
  } catch (error) {}
};

const getSingle = (req, res) => {
  const id = req.params.id;
  try {
    db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, resp) => {
      if (err) {
        return console.log(err);
        return;
      }
      return res.json(resp);
    });
  } catch (error) {}
};

const getTopBalance = (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE balance > 5000`;
    db.query(query, (err, users) => {
      if (err) console.log(err);
      res.json(users);
      return;
    });
  } catch (error) {}
};

const getSumOfBal = (req, res) => {
  try {
    let query = `SELECT SUM(balance) FROM users`;
    db.query(query, (err, bal) => {
      if (err) console.log(err);
      res.json(bal);
      return;
    });
  } catch (error) {}
};

const sumPaid = (req, res) => {
  try {
    let query = `SELECT SUM(paid) FROM users`;
    db.query(query, (err, paid) => {
      if (err) console.log(err);
      res.json(paid);
      return;
    });
  } catch (error) {}
};

const sumCons = (req, res) => {
  try {
    let query = `SELECT SUM(consumedUnits) FROM users`;
    db.query(query, (err, cons) => {
      if (err) console.log(err);
      res.json(cons[0]);
      return;
    });
  } catch (error) {}
};

const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const { error, values } = validators.signup_validator.validate(req.body);
    if (error) {
      res.json(error);
      return;
    }
    const query_1 = `SELECT * FROM auth WHERE email = "${email}"`;
    db.query(query_1, async (error, user) => {
      if (error) {
        res.json(error);
        return;
      }
      if (user[0]) {
        res.json({ message: "Account already exists" });
        return;
      }
      const id = uuid4();
      const hashed_pass = await bcrypt.hash(password, 10);
      const query_2 = `INSERT INTO auth VALUES ("${id}","${name}","${email}","${hashed_pass}")`;
      db.query(query_2, async (error, succes) => {
        if (error) {
          res.json(error);
          return;
        }
        res.json({ message: "Account created successfully" });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query_3 = `SELECT * FROM auth WHERE email = "${email}"`;
    db.query(query_3, async (error, user) => {
      if (error) {
        res.json(error);
        return;
      }
      if (!user[0]) {
        res.json({ message: "Account doesn't exist! sign Up " });
        return;
      }
      const legit_pass = await bcrypt.compare(password, user[0].password);
      if (!legit_pass) {
        res.json({ message: "Please check your password" });
        return;
      }
      const payload = user.map((data) => {
        const { password, ...rest } = data;
        return rest;
      });
      const token = jwt.sign(payload[0], process.env.JWT_SECRET, {
        expiresIn: "3600s",
      });
      res.json({ message: "Log in success", token });
    });
  } catch (error) {
    res.json(error);
  }
};
const ChangePass = async (req, res) => {
  try {
    const { email, password, oldpass } = await req.body;
    const { error, values } = validators.change_validator.validate(
      await req.body
    );
    if (error) {
      res.json(error);
      return;
    }
    const query_4 = `SELECT * FROM auth WHERE email = "${email}"`;
    db.query(query_4, async (error, user) => {
      if (error) {
        res.json(error);
        return;
      }
      if (!user[0]) {
        res.json({ message: "Please check the email" });
        return;
      }
      const legit_pass2 = await bcrypt.compare(oldpass, user[0].password);
      if (!legit_pass2) {
        res.json({ message: "Wrong old password " });
        return;
      }
      const hashed_pass2 = await bcrypt.hash(password, 10);
      const query_5 = `UPDATE auth SET password = "${hashed_pass2}" WHERE email = "${email}"`;
      db.query(query_5, async (error, resp) => {
        if (error) {
          res.json(error);
          return;
        }
        res.json({ message: "Password changed successfully" });
      });
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getUsers,
  postUser,
  delUser,
  updateTable,
  getTopBalance,
  getSingle,
  getSumOfBal,
  sumPaid,
  sumCons,
  signUp,
  login,
  ChangePass,
};
