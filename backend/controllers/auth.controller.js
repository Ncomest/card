const { generateToken } = require("../constance/token");
const bcrypt = require("bcrypt");

// Временно пока нет данные в БД
const users = [
  {
    username: "Igor",
    password: "$2b$05$98KZk.ApcIvh8euJC488ieo3NbKiEkCsd77w.rCiXyHN2xqxd0ahW", // admin
    role: "admin",
  },
  {
    username: "Stas",
    password: "$2b$05$Ba2JZLubTAKSH906YUHsyeW862NxkQUO4iO4ZjmbFsiOba2sXyuF.", // berserk2024
    role: "gamer",
  },
  {
    username: "Viewer",
    password: "$2b$05$BU/gL5/DLRFVQ8YKwjJcneMXqcsh6M5L0iXRWQ.QW1BymkhYUupm6", // viewer
    role: "viewer",
  },
];

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  try {
    if (!user)
      return res.status(401).json({ message: "net takogo polzovately" });
    const hashPassword = await bcrypt.hash(password, 5);
    const hashedPassword = await bcrypt.compare(password, user.password);
    console.log(hashPassword);
    console.log(hashedPassword);

    if (username === user.username && hashedPassword) {
      const tokens = generateToken({ user: user.username, role: user.role });

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        // sameTime: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        // sameTime: "strict",
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
  console.log("work");
  try {
    res.status(200).json({ message: "Вы авторизованы" });
  } catch (error) {
    res.status(500).json({ message: "Вы не авторизованы" });
  }
};

module.exports = { login, logout, check };
