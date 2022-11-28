//__________________________ Import or Require Module ___________________________________________

const express=require('express')
const {createBook} = require('../controllers/bookController')
const reviewController = require('../Controllers/reviewController')
const userController = require("../controllers/userController")
const {authentication,authorization}=require('../Middleware/auth')
const router=express.Router()

//__________________________ get api : for Test ___________________________________________

router.get("/test",(req,res)=>{
    return res.send({status:true,message:"This is My Group3 Project"});
})


router.post("/books",createBook)

module.exports = router;