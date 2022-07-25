const jwt = require("jsonwebtoken");

const refactorToken = (token) => {
  if (token !== undefined) {
    // console.log(token, "token?>>>>>>");
    try {
      const decoded = jwt.verify(token.token, "CodeDrill secret");
      return { isAuth: true, userid: decoded.id };
    } catch (err) {
      console.log(err, "err");
      return { isAuth: false };
    }
  } else {
    return { isAuth: null };
  }
};
module.exports = { refactorToken };
