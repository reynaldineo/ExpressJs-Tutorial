const { Router } = require("express");

const router = Router();

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

router.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

router.get("/", (req, res) => {
  res.cookie("visited", "true", { maxAge: 1000 * 60 });
  res.send(groceryList);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceriesItem = groceryList.find((grocery) => grocery.item === item);
  res.send(groceriesItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("you have no cart session");
  } else {
    res.send(cart);
  }
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});
module.exports = router;
