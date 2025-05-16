const user = require("../models/user");
const { checkUserSchema  } = require("../validations/loginvalidate");
const { createUserSchema } = require("../validations/uservalidator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "invalid data", error: error.details[0].message });
    }

    const userr = await user.findOne({ email: req.body.email });
    if (userr) {
      return res.status(409).json({ message: "user already exists" });
    }
    const password = await bcrypt.hash(req.body.password, 10);

    await user.create({
      email: req.body.email,
      passwordHash: password,
    });
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { error } = checkUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "invalid data", error: error.details[0].message });
    }

    const userFound = await user.findOne({ email: req.body.email });
    if (!userFound || !(await bcrypt.compare(req.body.password, userFound.passwordHash))) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: userFound._id , role: userFound.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: userFound._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "login success", token:{accessToken,refreshToken} });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};