const { jwt } = require("jsonwebtoken");
const { LoginSchema } = require("../database/login");

const saveUser = async (data) => {
  const result = await LoginSchema(data).save();
  const output = {
    data: result,
    message: "Employee created",
  };
  return output;
};

const loginUser = async (data) => {
  const result = await LoginSchema(data).findOne({
    username: data.username,
  });
  if (result === null) {
    // console.log("user doesn't exists");
    const output = {
      data: {},
      message: "user doesn't exists",
      status: 400,
    };
    return output;
  } else if (username === data.username && password != data.password) {
    // console.log("invalid credentials");
    const output = {
      data: {},
      message: "invalid credentials",
      status: 401,
    };
    return output;
  } else {
    const logintoken = (result) => {
      return jwt.sign({ result }, "CodeDrill secret", {
        expiresIn: 3 * 24 * 60 * 60,
      });
    };
    const output = {
      data: logintoken,
      message: "logged in successfully....",
      status: 200,
    };
    return output;
  }
};

module.exports = { saveUser, loginUser };
