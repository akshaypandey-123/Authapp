const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.auth=(req,res,next)=>{
    try{
        const  token=req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing"
            })
        }
        try{
            const  decode=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode
           


        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is valid"
            })


        }
        next();
        


    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"something went wrong while  verifying the token"
        })


    }

}
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!="Student"){
            return res.status(401).json({
                success:false,
                message:"this is procted routed for student "
                
            })
        }
        next()

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user can not matching"
        })

    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"this is procted routed for admin "
                
            })
        }
        next()


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user can not matching"
        })

    }
}

