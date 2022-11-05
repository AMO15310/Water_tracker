const db = require("../config/config");
const { v4: uuid4 } = require("uuid");

const getUsers = (req, res) => {
  try {
    db.query(`SELECT * FROM users`, (err, response) => {
      if (err) return console.log({ err });
      return res.json(response);
    });
  } catch (error) {}
};

const postUser = (req, res) => {
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
  try {
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
      if (err) throw err;
      return res.json(resp);
    });
  } catch (error) {}
};

const delUser = (req, res) => {
  const id = req.params.id;
  try {
    db.query(`DELETE FROM Users WHERE id = '${id}'`, (error, response) => {
      if (error) return console.log(error);
      return res.json(response);
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
      return res.json(resp);
    });
  } catch (error) {}
};

const getSingle = (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, resp) => {
      if (err) {
        return console.log(err);
      }
      return res.json(resp);
    });
  } catch (error) {}
};
module.exports = { getUsers, postUser, delUser, updateTable, getSingle };
