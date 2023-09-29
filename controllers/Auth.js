const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.signup=async(req,res)=>{
    try{
    const{name,email,password,role}=req.body;
    const existingUser=await User.findOne({email})
    
    
    if(existingUser){
        res.status(400).json({
            succes:false,
            message:"user already exist"
        })
    }
    let hashedPassword
    try{

        hashedPassword=await bcrypt.hash(password,10)
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"error in  hashing passwword"
        })

    }
    const user=await User.create({name,password:hashedPassword,email,role})

    return res.status(200).json({
        succcess:true,
        mesage:"user creates  succesfully",
    })


    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"user can not be ragister ,please try again latter"
        })

    }
    
    


}

exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"please fill the all blank"
            })
        }
        let user=await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user is not ragistered"
            })
    
        }
        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
    
        }
        
        if( await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user=user.toObject()
            user.token=token
            user.password=undefined
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
    
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"user loged  in successfully"
            })
    
            
    
    
    
        }
        else{
            res.status(403).json({
                success:false,
                messsage:"password incoorect "
            })
        }
    

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            successs:false,
            messsage:"login failure"
        })

    }
   
}
