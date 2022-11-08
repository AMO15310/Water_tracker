const db = require("../config/config");
const { v4: uuid4 } = require("uuid");
const schema_1 = require("../validators/schema");

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
    const { error, value } = schema_1.validate(req.body);
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
    const { err, values } = schema_1.validate(req.body);
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
};
