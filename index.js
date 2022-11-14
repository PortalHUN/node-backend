//Imports
require("dotenv").config();
require("./utilities/db");
const express = require("express");

//Constants
const port = process.env.PORT || 3000;

//Declarable
const app = express();

//Uses
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());
app.use(require("cors")());//require("./config/corsOptions")
app.use(require("./utilities/responseTimer"));

//Paths
app.use("/", require("./routes/default"));
app.use("/",require('./routes/auth'));
app.use("/", require("./routes/missing"));

//Error handler
app.use(require("./middleware/errorHandler"));

//Listen
app.listen(port, () => {
  console.log(`[Server] Application is running on port ${port}...`);
});
