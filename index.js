require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

app.use(express.json());

//api routes
app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server connected on port", PORT);
});
