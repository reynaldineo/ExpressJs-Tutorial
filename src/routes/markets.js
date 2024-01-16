const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Trader Joes",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Albertsons",
    miles: 2.8,
  },
  {
    id: 4,
    store: "Trader Joes",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Albertsons",
    miles: 1.8,
  },
];

router.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});

router.get("/", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    const filteredStore = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filteredStore);
  } else res.send(supermarkets);
});

router.get("/:store", (req, res) => {
  const { store } = req.params;
  const marketStore = supermarkets.find((market) => market.store === store);
  res.send(marketStore);
});

module.exports = router;
