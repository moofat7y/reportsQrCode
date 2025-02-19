import { validationResult } from "express-validator";
import UserModel from "../models/userModel.js";
import errHandler from "../utils/errHandler.js";
import jwt from "jsonwebtoken";

// CREATE NEW USER ACCOUNT
export const signUp = async (req, res, next) => {
  const data = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      errHandler(errors.array()[0].msg, 400);
    }
    const newUser = await UserModel.create({
      ...data,
    });

    res.status(201).json({ message: "User created sucessfuly", data: newUser });
  } catch (error) {
    next(error);
  }
};

// SIGNIN USER ACCOUNT
export const signIn = async (req, res, next) => {
  const { email, password: userPassword } = req.body;
  try {
    const isUserExist = await UserModel.findOne({ email });

    if (!isUserExist) {
      errHandler("Invalid password or email", 404);
    }

    const isCorrectPassword = await isUserExist.isPasswordMatch(userPassword);
    if (!isCorrectPassword) {
      errHandler("Invalid password or email", 403);
    }

    const accessToken = jwt.sign(
      {
        _id: isUserExist._id,
        email: isUserExist.email,
      },
      process.env.JWT_ACCESS_TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    console.log(accessToken);

    isUserExist.accessToken = accessToken;
    await isUserExist.save();

    const { password, ...other } = isUserExist._doc;

    res.status(200).json({
      message: `Welcome back ${isUserExist.fullName}`,
      data: { ...other, accessToken },
    });
  } catch (error) {
    next(error);
  }
};
