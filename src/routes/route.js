//__________________________ Import or Require Module ___________________________________________

const express=require('express')
const {createBook,getBooks,getBooksById} = require('../controllers/bookController')
const userController = require("../controllers/userController")
const reviewController = require('../Controllers/reviewController')
const {authentication,authorization}=require('../Middleware/auth')
const router=express.Router()

//__________________________ get api : for Test ___________________________________________

router.get("/test",(req,res)=>{
    return res.send({status:true,message:"This is My Group3 Project"});
})


router.post("/books",createBook)
router.get("/books",getBooks)
router.get("/books/:bookId",getBooksById)

router.post("/register",userController.createUser)
router.post("/login",userController.login)

//______________________ create review____________________________________
router.post("/books/:bookId/review",reviewController.createReview)
//______________________ Update review____________________________________
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)

module.exports = router;