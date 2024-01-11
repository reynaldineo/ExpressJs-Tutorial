const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    store: "Whole Foods",
  },
  {
    store: "Trader Joes",
  },
  {
    store: "Albertsons",
  },
];

router.get("/", (req, res) => {
  res.send(supermarkets);
});

router.get("/:store", (req, res) => {
  const { store } = req.params;
  const marketStore = supermarkets.find((market) => market.store === store);
  res.send(marketStore);
});

module.exports = router;
