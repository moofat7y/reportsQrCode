import express from "express";
import { body } from "express-validator";
import UserModel from "../models/userModel.js";
import { signUp, signIn } from "../controllers/authCtrl.js";
const router = express.Router();

// CREATE NEW USER
router.post(
  "/signup",
  [
    body(
      "fullName",
      "fullName required and must be at least 3 character and 20 character for max length"
    )
      .trim()
      .isLength({ min: 3, max: 20 }),
    body("password").notEmpty().trim().withMessage("Password is required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .custom(async (value, { req }) => {
        const isEmailExistBefore = await UserModel.findOne({ email: value });
        if (isEmailExistBefore) {
          return Promise.reject("User email is used before");
        }
      }),
  ],
  signUp
);
// SIGNIN USER AND GET VERFICATION CODE
router.post("/signin", signIn);

// // RESET VERIFICATION CODE
// router.post(
//   "/reset-code",
//   body("email", "email").notEmpty().trim(),
//   authCtrl.resentVerificationCode
// );

// // VERIFY EMAIL ADDRESS
// router.post(
//   "/verify-email",
//   [
//     body("code", "code").notEmpty().trim(),
//     body("email", "email").notEmpty().trim(),
//   ],
//   authCtrl.verifyEmail
// );
// // REFREH ACCESS TOKEN WHEN EXPIRE WITH REFRESH TOKEN
// router.get("/refresh-token", authCtrl.handleRefreshToken);
export default router;
