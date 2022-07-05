const jwt = require("jsonwebtoken");
const LoginSchema = require("../database/login");
const AdminSchema = require("../database/admin");

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
  const result = await LoginSchema.findOne({ username: data.username });
  console.log(result, "result");
  if (result === null) {
    const output = {
      data: {},
      message: "user doesn't exists",
      status: 400,
    };
    return output;
  } else if (result.length === 0) {
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
    const output = {
      data: {},
      message: "invalid credentials",
      status: 401,
    };
    return output;
  } else {
    console.log({ id: result._id }, "login token");
    const token = jwt.sign({ id: result._id }, "CodeDrill secret", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    console.log(token);
    const output = {
      data: {
        token: token,
      },
      message: "logged in successfully....",
      status: 200,
    };
    return output;
  }
};

const saveAdmin = async (data) => {
  // console.log(data);
  const result = await AdminSchema(data).save();
  const output = {
    data: result,
    message: "Employee created",
  };
  return output;
};

const loginAdmin = async (data) => {
  const result = await AdminSchema.findOne({ username: data.username });

  if (result === null) {
    const output = {
      data: {},
      message: "user doesn't exists",
      status: 400,
    };
    return output;
  } else if (result.length === 0) {
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
    const output = {
      data: {},
      message: "invalid credentials",
      status: 401,
    };
    return output;
  } else {
    console.log({ id: result._id }, "login token");
    const token = jwt.sign({ id: result._id }, "CodeDrill secret", {
      expiresIn: 3 * 24 * 60 * 60,
    });
    console.log(token);
    const output = {
      data: {
        token: token,
      },
      message: "logged in successfully....",
      status: 200,
    };
    return output;
  }
};

module.exports = { saveUser, loginUser, saveAdmin, loginAdmin };
