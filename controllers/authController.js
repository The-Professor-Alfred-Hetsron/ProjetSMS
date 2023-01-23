import User from "../models/UserModel.js"
import Contact from "../models/ContactModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import crypto from "crypto"
import sendToken from "../utils/jwtToken.js"
import mongoose from "mongoose"

//inscription
export const createUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, comcode, phone, password } = req.body;
    if (!email && !phone){
        return next(new ErrorHandler("Please enter the email & phone number", 400));
    }
	if (!comcode || !name || !password){
		return next(new ErrorHandler("Missing required field", 400));
	}
    try{
		const data = {
			email,
            password,
		}
        const debuser = await User.create(data);
		const cdata = {
            creator: debuser.id,
			name,
			email,
			phone,
            zipCode: comcode, 
		}
		const userContact = await Contact.create(cdata);
		console.log(userContact.id)
		const user = await User.findByIdAndUpdate(debuser.id, {
			contact: userContact.id
		}, {
			new: true,
			runValidator: true,
			useFindAndModify: false,
		  });
		await user.save()
		console.log(user)
        sendToken(user, 200, res);
    }
    catch (err){
        return next(new ErrorHandler("internal server error "+err.message, 400));
    }
  });

  
// Connection
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please enter the email & password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new ErrorHandler("User is not find with this email", 401)
      );
    }
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("User is not find with this email & password", 402)
      );
    }
    console.log("nouvelle connexion etablie")
    sendToken(user, 201, res);
});
  
//  Deconnexion
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Log out success",
    });
});

//  Get user Details
export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
});

// Update User Password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  
	const { id } = 	req.user
	const { oldPassword, newPassword, confirmPassword } = req.body
  	const user = await User.findById(id).select("+password");
	
  	const isPasswordMatched = await user.comparePassword(oldPassword);
	console.log(isPasswordMatched)
	if (!isPasswordMatched) {
		return next(
		new ErrorHandler("Old Password is incorrect", 400)
		);
	};

  if( newPassword  !== confirmPassword){
      return next(
          new ErrorHandler("Password not matched with each other", 400)
        );
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);
});


// Delete User ---Admin
export const deleteUser = catchAsyncErrors(async(req,res,next) =>{
  
  const user = await User.findById(req.params.id);

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

   if(!user){
       return next(new ErrorHandler("User is not found with this id",400));
   }

   await user.remove();

   res.status(200).json({
       success: true,
       message:"User deleted successfully"
   })
});


// oublie du mot de passe
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const { email } = req.body

	if (!email) {
		return next(new ErrorHandler("not email found in your request", 404));
	}
	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}

  	// obtenir un  nouveau Token

	const resetToken = user.getResetToken();

	await user.save({
		validateBeforeSave: false,
	});

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/user/password/reset/${resetToken}`;

  	const message = `Your password reset link is :- \n\n ${resetPasswordUrl}`;

	try {
		res.status(200).json({
			success: true,
			message: message,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordTime = undefined;

		await user.save({
			validateBeforeSave: false,
		});

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reinitialiser le mot de passe
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  	// Creation du Token hash
	const { token } = req.params
	const { password, confirmPassword } = req.body
	if (!token) {
		return next(new ErrorHandler("invalid token", 500));
	}
	if (!password || !confirmPassword) {
		return next(new ErrorHandler("missing required field", 500));
	}
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordTime: { $gt: Date.now() },
	});
	if (!user) {
		return next(
		new ErrorHandler("Reset password url is invalid or has been expired", 400)
		);
	}

	if (password !== confirmPassword) {
		return next(
		new ErrorHandler("Password is not matched with the new password", 400)
		);
	}

  	user.password = password;
  	user.resetPasswordToken = undefined;
  	user.resetPasswordTime = undefined;
	console.log(password)
	try {
		await user.save();
		sendToken(user, 200, res);
	} catch (error) {
		console.log(error.message)
	}
});

// Update User Profile
export const updateUser = catchAsyncErrors(async(req,res,next) =>{
    const data = {
		name: req.body.name,
		surname: req.body.surname,
        email: req.body.email,
		number: req.body.phoneNumber,
		password: req.body.password,
    };

  const user = await User.findByIdAndUpdate(req.user.id, data, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get All users ---Admin
export const getAllUsers = catchAsyncErrors(async (req,res,next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});