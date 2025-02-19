import jwt from "jsonwebtoken";
import errHandler from "../utils/errHandler.js";
import UserModel from "../models/userModel.js";

const isAuth = async (req, res, next) => {
  const header = req.headers?.authorization;

  try {
    if (!header || !header?.startsWith("Bearer")) {
      errHandler("You are not authonticated", 403);
    }
    const headerToken = header.split(" ")[1];
    const decodedToken = jwt.verify(
      headerToken,
      process.env.JWT_ACCESS_TOKEN_KEY,
      {},
      (err, decodedToken) => {
        if (err) {
          errHandler("Your session is expired", 401);
        }
        return decodedToken;
      }
    );
    const user = await UserModel.findOne({
      _id: decodedToken._id,
    });
    if (!user) {
      errHandler("There is no user found", 401);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
