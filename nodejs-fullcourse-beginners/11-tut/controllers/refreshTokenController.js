const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const usersFile = path.join(__dirname, "..", "model", "users.json");

const usersDB = {
  users: require(usersFile),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  console.log(refreshToken);

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }

  //Evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.status(200).json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
