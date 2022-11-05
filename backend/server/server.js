const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const router = require("../routes/routes");

app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ... `);
});
