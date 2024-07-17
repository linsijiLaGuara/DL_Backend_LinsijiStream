const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/routerInvoke");
const { handleErrors } = require("./middlewares/errorsHandler");
const HandleDatabaseLogs = require("./middlewares/logsMiddleware");

const app = express();

// middlewares
app.use(express.json());

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// routes
app.use("/api", HandleDatabaseLogs, routes);

// Handle errors
app.use(handleErrors);

module.exports = app;
