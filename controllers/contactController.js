import Contact from "../models/ContactModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import User from "../models/UserModel.js";

//creation du contact
export const createContact = catchAsyncErrors(async (req, res, next) => {
    const { name, email, comcode, phone } = req.body;
    const { id } = req.user
    if (!email || !phone || !comcode || !name){
        return next(new ErrorHandler("Please enter the email & phone number or all required fields", 400));
    }
    if (!id){
        return next(new ErrorHandler("only connected user can create contact", 400));
    }  
    try{
		const data = {
            creator: id,
			name,
			email,
			phone,
            zipCode: comcode, 
		}
		console.log(data)
        const contact = await Contact.create(data)
        const user = await User.findOne({id})
        user.contacts.push(contact.id)
        await user.save()
        res.status(200).json({
            status: "success",
            contact,
        })
    }
    catch{
        return next(new ErrorHandler("internal server error", 400));
    }
  });

//  Get Contact
export const getContact = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    if (!id){
        return next(new ErrorHandler("missing contact id", 400));
    } 
    const contact = await Contact.findById(id);
    if (!contact){
        return next(new ErrorHandler("contact not found", 400));
    }
    res.status(200).json({
      success: true,
      contact,
    });
});


// Update Contact
export const updateContact = catchAsyncErrors(async(req,res,next) =>{
    const { id } = req.params
    if (!id){
        return next(new ErrorHandler("missing contact id", 400));
    } 
    const data = {
		name: req.body.name,
        email: req.body.email,
		number: req.body.phoneNumber,
        zipcode: req.body.comcode
    };
    const contact = await Contact.findByIdAndUpdate(id, data, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});

// Delete Contact
export const deleteContact = catchAsyncErrors(async(req,res,next) =>{
    const { id } = req.params
    const { user } = req
    if (!id){
        return next(new ErrorHandler("missing contact id", 400));
    }
    if (!user){
        return next(new ErrorHandler("only connected user can delete contact", 400));
    }
    const contact = await Contact.findById(id);
  
     if(!contact){
        return next(new ErrorHandler("no contact found with this id",400));
     }
     console.log(contact.creator.toString())
     console.log(user.id)
     if (contact.creator.toString() === user.id){
        const foundId = user.contacts.findIndex((user) => {
            return Number.parseInt(user.id) == Number.parseInt(contact.id)
        })
        if (foundId){
            user.contacts.splice(foundId, 1)
            await user.save()
            await contact.remove();
            res.status(200).json({
                success: true,
                message:"Contact deleted successfully"
            })
        }
        else{
            return next(new ErrorHandler("This is not your contact",400))
        }
     }
     else{
        return next(new ErrorHandler("This is not your contact",400))
     }
  
  });

//  Get Contact
export const getContacts = catchAsyncErrors(async (req, res, next) => {
    const { user } = req
    if (!user){
        return next(new ErrorHandler("you must be connected", 400));
    } 
    const contacts = await Contact.find({owner: user.id});
    if (!contacts){
        return next(new ErrorHandler("contact not found", 400));
    }
    res.status(200).json({
      success: true,
      contacts,
    });
});