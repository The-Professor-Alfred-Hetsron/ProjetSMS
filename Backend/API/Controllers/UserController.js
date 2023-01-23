// Same as ContactController

//mettre le chemin relatif vers le model user
const User = require('');



exports.login =(req, res, next)=>{
  console.log('req.body',req.body)
    User.findOne({email: req.body.email})
    .then(data=>{
      console.log('data', data)
      if(data === null){
          res.status(401).json({message:'identifiant ou mot de passe incorrecte'})
      }else{
          bcrypt.compare(req.body.password,data.password)
          .then(valid=>{
              if(!valid){
                  res.status(401).json({message:'identifiant ou mot de passe incorrecte'})
              }else{
                res.status(200).json({data});
              }
          })
          .catch(error=>{
              res.status(500).json({error});
          })
       }
    })
    .catch(error =>{
      res.status(500).json({error});
    })
  };