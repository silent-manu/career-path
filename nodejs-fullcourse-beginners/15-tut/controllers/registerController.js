const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  //Check for duplicate usernames
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "Username already exists." });
  }

  try {
    //Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //Create and store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    const result = await User.create(newUser);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
