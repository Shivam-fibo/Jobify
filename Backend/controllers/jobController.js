import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from '../models/jobSchema.js'

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    sucess: true,
    jobs
  });
});
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getmyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }

  const myJobs = await Job.find({ postedBy: req.user_id });
  res.status(200).json({
    sucess: true,
    myJobs
  })
  
})

export const updateJob = catchAsyncErrors(async(req,res,next) =>{
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {id} = req.params;
  let job = await Job.findById(id);
  if(!job){
    return next(
      new ErrorHandler("Oops Job not found!!" , 404)
    )
  }
  res.status(200).json({
    success:true,
    job,
    message:"Job updates succesfully!"
  })
})


export const deleteJob = catchAsyncErrors(async(req,res,next) =>{
  const {role} = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {id} = req.params;
  let job = await Job.findById(id);
  if(!job){
    return next(
      new ErrorHandler("Oops Job not found!!" , 404)
    )
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message:"Job deleted succesfully"
  });

});


export const getSingleJob = catchAsyncErrors(async(req, res,next) =>{
  const {id} = req.params;
  try {
    const job = await Job.findById(id);


    if(!job){
      return next(new ErrorHandler("Job not found", 404))
    }
    res.status(200).json({
      success:true,
      job,
    })
  } catch (error) {
    return next(new ErrorHandler("Invalid ID/Cast Error ", 400))
  }
})