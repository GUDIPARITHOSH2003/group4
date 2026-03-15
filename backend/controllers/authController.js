const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signup = (req, res) => {

  const { name, email, password } = req.body;

  User.findUserByEmail(email, async (err, result) => {

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(name, email, hashedPassword, (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully"
      });

    });

  });

};



exports.login = (req, res) => {

  const { email, password } = req.body;

  User.findUserByEmail(email, async (err, result) => {

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  });

};
