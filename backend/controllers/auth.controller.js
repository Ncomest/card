const { generateToken } = require("../constance/token");

// Временно пока нет данные в БД
const users = [
  {
    username: "Igor",
    password: "admin",
    role: "admin",
  },
  {
    username: "Stas",
    password: "berserk2024",
    role: "gamer",
  },
  {
    username: "Viewer",
    password: "viewer",
    role: "viewer",
  },
];

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  try {
    if (username === user.username && password === user.password) {
      const tokens = generateToken({ user: user.username, role: user.role });

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameTime: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameTime: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken: tokens.accessToken });
    } else {
      res.status(401).json({ message: "Неверные логин или пароль" });
    }
  } catch (error) {
    res.status(500).json({ message: "Пользователь не найден" });
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Вы вышли из системы" });
};

const check = async (req, res) => {
  try {
    res.status(200).json({ message: "Вы авторизованы" });
  } catch (error) {
    res.status(500).json({ message: "Вы не авторизованы" });
  }
};

module.exports = { login, logout, check };
