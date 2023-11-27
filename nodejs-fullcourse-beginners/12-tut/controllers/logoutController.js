const path = require("path");
const fsPromises = require("fs").promises;
const usersFile = path.join(__dirname, "..", "model", "users.json");

const usersDB = {
  users: require(usersFile),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  //On cliente, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }

  const refreshToken = cookies.jwt;

  //Is refreshToken in DB?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204); //No content
  }

  //Delete refreshToken in DB
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(usersFile, JSON.stringify(usersDB.users));

  //Delete refreshToken
  res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serves on https
  return res.sendStatus(204); //No content
};

module.exports = { handleLogout };
