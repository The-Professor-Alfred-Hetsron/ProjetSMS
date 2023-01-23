// Same as ContactController

//mettre le chemin relatif vers le model user
const User = require('');



exports.login =(req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(data=>{
        res.status(200).json({data});
    })
    .catch(error =>{
      res.status(500).json({error});
    })
  };