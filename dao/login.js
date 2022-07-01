const jwt = require("jsonwebtoken");
const  LoginSchema  = require("../database/login");

const saveUser = async (data) => {
  // console.log(data);
  const result = await LoginSchema(data).save();
  const output = {
    data: result,
    message: "Employee created",
  };
  return output;
};

const loginUser = async (data) => {
  const result = await LoginSchema.findOne({
    username: data.username,
  });
  // console.log(result,"result");
  if (result === null) {
    // console.log("user doesn't exists");
    const output = {
      data: {},
      message: "user doesn't exists",
      status: 400,
    };
    return output;
  } else if (
    result.username === data.username &&
    result.password !== data.password
  ) {
    // console.log("invalid credentials");
    const output = {
      data: {},
      message: "invalid credentials",
      status: 401,
    };
    return output;
  } else {
    // console.log("here");
    // const token = (result) => {
    const token = jwt.sign({id: result._id }, "CodeDrill secret", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    console.log(token);
    // };
    const output = {
      data: {
        token: token
      },
      message: "logged in successfully....",
      status: 200,
    };
    return output;
  }
};

module.exports = { saveUser, loginUser };
