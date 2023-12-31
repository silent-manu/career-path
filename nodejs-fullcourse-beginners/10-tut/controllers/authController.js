const path = require("path");
const bcrypt = require("bcrypt");
const usersFile = path.join(__dirname, "..", "model", "users.json");

const usersDB = {
  users: require(usersFile),
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) {
    return res.sendStatus(401); //Unauthorized
  }

  //Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    //Passwords match
    res.status(200).json({ message: `Welcome ${user}` });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

module.exports = { handleLogin };
