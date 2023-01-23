import User from "../models/UserModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import crypto from "crypto"
import sendToken from "../utils/jwtToken.js"

//inscription
export const createUser = catchAsyncErrors(async (req, res, next) => {

    const { name, surname, email, password, comcode, phone } = req.body;
    if (!email && !phone){
        return next(new ErrorHandler("Please enter the email & phone number", 400));
    } 
    const userInfo = {
        zipCode: comcode | 237,
        email,
        phone
    }
   
    try{
        const user = await User.create({
            name,
            surname,
            password,
            ...userInfo 
        });
        sendToken(user, 200, res);
    }
    catch{
        return next(new ErrorHandler("internal server error", 400));
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
   
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Old Password is incorrect", 400)
    );
  };

  if(req.body.newPassword  !== req.body.confirmPassword){
      return next(
          new ErrorHandler("Password not matched with each other", 400)
        );
  }

  user.password = req.body.newPassword;

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
	const user = await User.findOne({ email: req.body.email });

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
	)}/password/reset/${resetToken}`;

  	const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

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

	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
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

	if (req.body.password !== req.body.confirmPassword) {
		return next(
		new ErrorHandler("Password is not matched with the new password", 400)
		);
	}

	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordTime = undefined;

	await user.save();

	sendToken(user, 200, res);
});