// calling express
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");

// making an express instance
const app = express();
const PORT = 3001;

// call middleware
app.use(express.json()); // to allow sending json to the server
app.use(express.urlencoded()); // parsed to urlencoded, so it allow sendirg urlencoded to the server
app.use(cookieParser()); // to allow using cookies
app.use(
  session({
    secret: "POAPIWNEIQCNVBEJRWINWEOMZKWEOFMWOEOWFEN",
    resave: false,
    saveUninitialized: false,
  })
);
// simple custom middleware
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next(); // to continue to the next function
});

app.use("/api/v1/groceries", groceriesRoute);
app.use("/api/v1/markets", marketsRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
