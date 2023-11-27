const path = require("path");
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const usersFile = path.join(__dirname, "..", "model", "users.json");

const usersDB = {
  users: require(usersFile),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  //Check for duplicate usernames
  const duplicate = usersDB.users.find((person) => person.username === user);

  if (duplicate) {
    return res.status(409).json({ message: "Username already exists." });
  }

  try {
    //Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //Store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: { User: 2001 },
    };
    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(usersFile, JSON.stringify(usersDB.users));

    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
