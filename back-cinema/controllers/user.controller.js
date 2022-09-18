const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  // !! GET
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },

  // !! REGISTRATION
  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.ROUNDS)
      );
      const user = await User.create({ login: login, password: hash });
      res.json(user);
    } catch (e) {
      return res.status(401).json({
        error: "Ошибка при регистрации: " + e.toString(),
      });
    }
  },

  // !! AUTHORIZATION
  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });

    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин" });
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    const payload = {
      id: candidate._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "48h",
    });

    res.json({token, id: payload.id});
  },
};
