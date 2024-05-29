const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");
const { promisify } = require("util");

exports.register = async (req, resp, next) => {
  try {
    const { name, email, password, role, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User Already Registered Kindly Login"));
    }

    const newUser = await User.create(req.body);

    resp.status(200).json({
      status: true,
      message: "User registered Successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, resp, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(errorHandler(404, "User not found kindly Sign Up"));
  }

  const match = await user.comparePassword(user.password, password);
  if (!match) {
    return next(errorHandler(400, "Invalid Email or password"));
  }

  const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  resp
    .cookie("token", token)
    .status(200)
    .json({
      status: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};

exports.protect = async (req, resp, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token) {
      return next(errorHandler(404, "Kindly login to access"));
    }

    const decode = await promisify(JWT.verify)(token, process.env.SECRET_KEY);
    if (!decode) {
      return next(errorHandler(404, "Token expire kindly login again"));
    }

    const freshUser = await User.findById(decode.id);
    if (!freshUser) {
      return next(errorHandler(404, "User not found"));
    }

    req.user = freshUser;

    next();
  } catch (err) {
    next(err);
  }
};

exports.getAllInstructor = async (req, resp, next) => {
  const user = req.user.id;

  const admin = await User.find({ _id: { $ne: user } });

  resp.status(200).json({
    status: "success",
    admin,
  });
};

exports.isAdmin = (req, resp, next) => {
  if (req.user.role !== 1) {
    return next(errorHandler(400, "Unauthorize Access"));
  } else {
    next();
  }
};
