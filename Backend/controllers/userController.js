import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

import { sendToken } from "../utils/jwtTokens.js";


export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email already registered!"));
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    sendToken(user, 201, res, "User Registered!");
  });

export const login = catchAsyncErrors(async(req, res, next) =>{
  const {email, password, role} = req.body
  if( !email || !password || !role){
    return next(
      new ErrorHandler("Please provide email password and role" , 400)
    );
  }
    const user = await User.findOne({ email }).select("+password");
    if( !user){
      return next(
      new ErrorHandler("Invalid email or password" , 400)
      )
    }
    const isPassword = await user.comparePassword(password);
    if(!isPassword){
      return next(
      new ErrorHandler("Invalid email or password", 400)
      )
    }
    if(user.role !== role){
      return next(
      new ErrorHandler("User with this role is not found",400)
      )
    }
    sendToken(user, 200, res, "User logged in Succesfully!")

});

export const logout = catchAsyncErrors((req, res,next)=>{
res.status(201).cookie("token", "" ,{
  httpOnly : true,
  expires: new Date(Date.now()),
}).json({
  sucess: true,
  message: "User is succesfully log out"
})
})
  