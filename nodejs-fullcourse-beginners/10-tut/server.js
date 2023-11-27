const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

//Custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//Built-in middleware to handle urlencoded data
//in other words, form data: "Content-Type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for json
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname, "/public")));

//Routes
app.use('/', require('./routes/root'));
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));

app.get("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
