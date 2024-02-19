import { catchAsyncError } from "./catchAsyncError.js";
import Errorhandler from './error.js'
import jwt from 'jsonwebtoken'


export const isAuthorized = catchAsyncError((req, res, next) =>{
    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandler("User not authorized", 400));
    }
    
})