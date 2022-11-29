const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const{isValidBody,isValidNumber,isValidEmail,isValidpass,isValidName}=require('../util/valitor')


const createUser=async (req,res)=>{
  try{
       const reqBody=req.body
       const{title,name,phone,email,password,address}=req.body
       if(!isValidBody(reqBody)) return res.status(400).send({status:false,message:"data is required"})
       if(!title) return res.status(400).send({status:false,message:"title is madnatory"})
       if(title!="Mr"&&title!="Mrs"&&title!="Miss") return res.status(400).send({status:false,message:"title can be Mr,Mrs,Miss only"})
       //name validation
       if(!name) return res.status(400).send({status:false,message:"name is madnatory"})
       if(!isValidName(name)) return res.status(400).send({status:false,message:"invalid Name"})

       //phone number validation
       if(!phone) return res.status(400).send({status:false,message:"phone number is madnatory"})
       if(!isValidNumber(phone)) return res.status(400).send({status:false,message:"please provide valid mobile number"}) 
       const validNo=await userModel.findOne({phone})
       if(validNo) return res.status(400).send({status:false,message:"mobile number is already register"})

       //email validation
       if(!email) return res.status(400).send({status:false,message:"email is madnatory"})
       if(!isValidEmail(email)) return res.status(400).send({status:false,message:"please provide valid emailId"})
       const validemail=await userModel.findOne({email})
       if(validemail) return res.status(400).send({status:false,message:"emailId is already register"})

       //password validatiom
       if(!password) return res.status(400).send({status:false,message:"please set the password"})
       if(!isValidpass(password)) return res.status(400).send({status:false,message:"invalid password"})

       if(!address) return res.status(400).send({status:false,message:"address is madnatory"})

       const usersData=await userModel.create(reqBody)
       return res.status(201).send({status:true,data:usersData})

    }catch(err){
       return res.status(500).send({status:false,error:err.message})
    }
}


const login=async (req,res)=>{
    try{
       const{email,password}=req.body

       if(!email) return res.status(400).send({status:false,message:"emailId is madnatory"})
       if(!isValidEmail(email)) return res.status(400).send({status:false,message:"please provide valid emailId"})

       if(!password) return res.status(400).send({status:false,message:"password is madnetory"})
       if(!isValidpass(password)) return res.status(400).send({status:false,message:"invalid password"})

       const userData=await userModel.findOne({email,password})
       if(!userData) return res.status(404).send({status:false,message:"please provide valid emaiId and password"})
       
       const token=jwt.sign({userId:userData._id},"group-3",{expiresIn:"2m"})
       return res.status(200).send({status:true, message:'Success',data:token})

    }catch(err){
        return res.status(500).send({status:false,error:err.message})
    }
}

module.exports={createUser,login}

