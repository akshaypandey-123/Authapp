const express=require("express")
const router=express.Router()
const{login,signup}=require("../controllers/Auth")

const {auth,isStudent,isAdmin}=require("../middlewares/auth")
router.post("/login",login)
router.post("/signup",signup)
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome  to protected route  for test"
    })
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for student"
    })

router.get("/Admin",auth,isAdmin,(req,res)=>{
    res.json({
        status:true,
        message:"welocome to procted route for admin"
    })
})
    
})
module.exports=router;



 