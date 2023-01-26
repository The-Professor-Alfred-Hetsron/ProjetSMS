import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "./catchAsyncErrors.js"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"




export const isAuthenticatedUser = catchAsyncErrors(async (req,res,next) =>{
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login for access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

// Admin Roles
export const authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role.label)){
          return next(new ErrorHandler(`${req.user.role.label} can not access this resources`));
        };
        next();
    }
}