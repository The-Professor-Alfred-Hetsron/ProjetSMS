import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import Message from '../models/MessageModel.js'
import Contact from "../models/ContactModel.js"
import mongoose from "mongoose"



export const getMessage  = catchAsyncErrors(async (req, res, next) => {
    const { user } = req
    const { id } = req.params
    if (!id) {
        return next(new ErrorHandler("Please enter the message id", 400));
    }
    if (!user) {
        return next(new ErrorHandler("Only connected users can see messages", 400));
    }
    const message = await Message.findOne({id})
    if (!message) {
        return next(new ErrorHandler("not meaage found with that id", 401));
    }
    if ((user.contact.toString() !== message.sender.toString()) && (!message.receivers.find(receiver => {return receiver.toString() === user.id.toString()}))) {
        return next(new ErrorHandler("this message is not of yours", 401));
    }
    res.status(200).json({
        status: "success",
        message
    })
})

export const sendWhatsappMessage  = catchAsyncErrors(async (req, res, next) => {
    const { receivers, message } = req.body
    const { user } = req
    if (!receivers || !message) {
        return next(new ErrorHandler("Please enter the receiver & message content", 400));
    }
    if (!user) {
        return next(new ErrorHandler("Only connected users cand send message", 400));
    }
    //envoyer le message par l'api
    const dataToSend = {
        pnoneNumber: receivers,
        message,
        mediaUrl: null,
        externalId: null,
        lineId: null 
    }
    //enregistrer le message dans la bd
    const data = {
        content: message,
        sender: user.contact,
        receivers: []
    }
    user.contacts.map(async indexe => {
        const contact = receivers.find(item => item.toString() === indexe.toString())
        if (contact) data.receivers.push(mongoose.Types.ObjectId(contact))
    })
    console.log(data)
    const messageToSave = await Message.create(data)
    res.status(200).json({
        staatus: 'success',
        message: messageToSave
    })
})

export const deletetMessage  = catchAsyncErrors(async (req, res, next) => {
    const { user } = req
    const { id } = req.params
    if (!id) {
        return next(new ErrorHandler("Please enter the message id", 400));
    }
    if (!user) {
        return next(new ErrorHandler("Only connected users can see messages", 400));
    }
    const message = await Message.findOne({id})
    if (!message) {
        return next(new ErrorHandler("not meaage found with that id", 401));
    }
    if ((user.contact.toString() !== message.sender.toString()) && (!message.receivers.find(receiver => {return receiver.toString() === user.id.toString()}))) {
        return next(new ErrorHandler("this message is not of yours", 401));
    }
    await message.delete()
    
    res.status(200).json({
        status: "success",
    })
})