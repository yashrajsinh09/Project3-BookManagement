//__________________________ Importing Module ___________________________________________
 const jwt = require("jsonwebtoken")

//__________________________ authentication ___________________________________________

const authentication = function ( req , res , next ) 
{
    try 
    {
      let token = req.headers["token"]
      if(!token)
      {
        return res
        .status(401)
        .send({ status: false, msg: "Oooh... Please Provide a Token" });
      }
    
        let decodeToken = jwt.verify(token,"group-3");
        if(!decodeToken)
        {
            return res
          .status(401)
          .send({ status: false, msg: "this is an invalid token" });  
        }
        req.token = decodeToken
      
      next();
    }
    catch(err)
    {
        return res.status(500).send({ status: false, err: err.message });
 
    }
}
//__________________________ authorization ___________________________________________

const authorization = function(req,res,next)
{
    try{
        const userId = req.query.userId
        if(req.token.userId != userId)
        {
        return res
        .status(403)
        .send({ status: false, msg: "You are not Valid User" });
        }
        next()
    }
    catch(err)
    {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

//__________________________ Exporting Module ___________________________________________

module.exports = { authentication, authorization  };