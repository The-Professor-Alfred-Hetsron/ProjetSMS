import ErrorHandler from "../utils/ErrorHandler.js"
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"

export const sendWhatsappMessage  = catchAsyncErrors(async (req, res) => {
    const { receiver, message } = req
    if (!receiver || !message) {
        return next(new ErrorHandler("Please enter the receiver & message content", 400));
    }
    const dataToSend = {
        pnoneNumber: receiver,
        message,
        mediaUrl: null,
        externalId: null,
        lineId: null 
    }
})