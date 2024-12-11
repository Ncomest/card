const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
// только если будет куки
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateToken = (payload) => {
  try {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
    //только если будет cookie
    // const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    //   expiresIn: "7d",
    // });
    return { accessToken };
  } catch (error) {
    throw new Error("Ошибка при генерации токена");
  }
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  // const token = req.cookies.accessToken;
  console.log("(token.js, verifyAccessToken)", token);
  // const test = req.cookies;
  // console.log('test', test)

  if (!token)
    return res.status(401).json({ message: "Access token не предоставлен" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Access token не действительный" });
      // const refToken = req.cookies.refreshToken;

      //   if (!refToken)
      //     return res.status(403).json({ message: "Нет refretsh Token'a " });

      //   jwt.verify(refToken, JWT_REFRESH_SECRET, (err, decoded) => {
      //     if (err)
      //       return res
      //         .status(403)
      //         .json({ message: "Refresh Token более не действительный" });

      //     const newAccessToken = jwt.sign(
      //       { user: decoded.username, role: decoded.role },
      //       JWT_SECRET,
      //       { expiresIn: "15m" }
      //     );

      //     res.cookie("accessToken", newAccessToken, {
      //       httpOnly: true,
      //       secure: false,
      //       sameSite: "None",
      //       // sameTime: "strict",
      //       maxAge: 7 * 24 * 60 * 60 * 1000,
      //     });

      // req.user = decoded;
      // return next();
      // });
    }
    // else {
    req.user = user;
    next();
    // }
  });
};

module.exports = {
  generateToken,
  verifyAccessToken,
};
