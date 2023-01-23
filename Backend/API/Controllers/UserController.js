// Same as ContactController
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
//mettre le chemin relatif vers le model user
const User = require('');



exports.login =(req, res, next)=>{
  console.log('req.body',req.body)
    User.findOne({email: req.body.email})
    .then(user=>{
      console.log('user', user)
      if(user === null){
          res.status(401).json({message:'identifiant ou mot de passe incorrecte'})
      }else{
          bcrypt.compare(req.body.password,user.password)
          .then(valid=>{
              if(!valid){
                  res.status(401).json({message:'identifiant ou mot de passe incorrecte'})
              }else{
               //Implementation du token
                res.status(200).json({
                  userId: user._id,
                  token: jwt.sign(
                      {email: user.email, userId: user._id},
                      'secret_this_should_be_longer',
                      {expiresIn: '24h'}
                  )
                });
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