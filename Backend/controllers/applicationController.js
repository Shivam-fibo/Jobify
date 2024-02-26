import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Application} from "../models/applicationSchema.js"
import cloudinary from 'cloudinary'

export const employerGetAllApplications = catchAsyncErrors(async(req,res,next) =>{
    const {role} = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {_id} = req.user;
  const applications = await Application .find({'employerID.user':_id });
  res.status(200).json({
    success: true,
    applications
  })
});


export const jobseekerGetAllApplications = catchAsyncErrors(async(req,res,next) =>{
    const {role} = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  const {_id} = req.user;
  const applications = await Application .find({'applicantID.user' : _id})
  res.status(200).json({
    success: true,
    applications
  })
});

export const jobseekerDeleteApplications = catchAsyncErrors(async(req,res,next) =>{
    const {role} = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const {id} = req.params
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops the application is not found", 404))
    }
    application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application deleted succesfully"
    })
})



export const postApplication = catchAsyncErrors(async(req,res,next) =>{
    const {role} = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume file required"));
    }
    const {resume} = req.files;
    const allowedFormate = ["img/png", "img/jpg", "img/webp"];

    if(allowedFormate.includes(resume.mimetype)){
      return next( new ErrorHandler("Invalid file type. Plese upload your resume in PNG, JPG or WEBP formate", 400))
        
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary error:",cloudinaryResponse.error || "Unknow cloudinary error")
    }
    return next(new ErrorHandler("Failed to upload the resume", 500))
  
    const {name, email, coverletter, phone, address, jobId} = req.body;
    const applicationID = {
      user: req.user._id,
      role: "Job Seeker"
    }
});
