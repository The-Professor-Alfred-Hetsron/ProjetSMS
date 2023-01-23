// Import Model from the Database folder here
const User = require('../../Database/Models/User');

// Create a user
const save = (req, res, next) =>{

    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    user.save()
    .then(response =>{
        res.json({
            message: "User added successfully"
        })
    })
    .catch(error =>{
        res.json({
            message: "Error while saving user"
        })
    })

}



// show all user
const showAll = (req, res, next) =>{
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occurred!"
        })
    })
    
}

// show one user with a specific ID

const show = (req, res, next) =>{
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occurred!"
        })
    })
}


// update a user
const update = (req, res, next) =>{
    let userID = req.body.userID

    let updatedData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    User.findByIdAndUpdate(userID, {$set: updatedData})
    .then(response => {
        res.json({
            message: "User updated successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error updating user"        })
    })
}



// delete a user
const destroy = (req, res, next) =>{
    let userID = req.body.userID

    User.fondOneAndRemove(userID)
    .then(response => {
        res.json({
            message: "User deleted successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "Error deleting user"
        })
    })
}

module.exports = {
    save, showAll, show, update, destroy
}