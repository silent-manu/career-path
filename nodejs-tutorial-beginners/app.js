const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/alien", (req, res) => {
  const id = req.query.id || null;
  if (id) {
    console.log("Hey Alien, the lucky number is " + id);
    res.send("Hey Alien, the lucky number is " + id);
  } else {
    console.log("Welcome back, Alien!");
    res.send("Welcome back, Alien!");
  }
});

app.get("/alien/:id", (req, res) => {
  const id = req.params.id;
  console.log("Hey Manuel, the lucky number is " + id);
  res.send("Hey Manuel, the lucky number is " + id);
});

app.listen(port, () => {
  console.log("Server running on port:", port);
});