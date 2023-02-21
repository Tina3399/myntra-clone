const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userId;
        console.log(decoded.userId);
        next();
      } else {
        res.send({ msg: "Please Login First" });
      }
    });
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = { authenticate };
