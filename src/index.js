// calling express
const express = require("express");

// making an express instance
const app = express();
const PORT = 3001;

// call middleware
app.use(express.json()); // to allow sending json to the server
app.use(express.urlencoded()); // parsed to urlencoded, so it allow sendirg urlencoded to the server
// simple custom middleware
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next(); // to continue to the next function
});

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));

// mock database
const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "pop-tarts",
    quantity: 1,
  },
];

app.get("/groceries", (req, res) => {
  res.send(groceryList);
});

app.get("/groceries/:item", (req, res) => {
  const { item } = req.params;
  const groceriesItem = groceryList.find((grocery) => grocery.item === item);
  res.send(groceriesItem);
});

app.post("/groceries", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});
