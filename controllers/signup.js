const mongoose=require("mongoose");
const bcrypt = require ('bcrypt');
var validator = require('validator');
const usermodel=require("../models/Users");
//util
const {generateToken,forgetPassword,AppError,verfiyMail,dbErrorHandler}=require("../util/util");

const salt_rounds = 5;
//handling GET /Signup

function get(req,res)
{
	res.render("signup");
}

//handling POST /signup
async function post(req,res){
      if(!validator.isEmail(req.body.email)){ 
          res.render("signup",{error_msg:"Invalid Email",user:""}); 
          return
      }
      
      let hash = bcrypt.hashSync(req.body.password, salt_rounds);
      req.body.password=hash;
      let new_user=new usermodel({
            name:req.body.name,
            gender:req.body.gender,
            email:req.body.email,
            password:req.body.password,
            date_of_birth:req.body.date_of_birth,
            phoneno:req.body.phoneno,
            whatsappno:req.body.whatsappno,
            drivingexpereince:req.body.drivingexpereince,
            licenseno:req.body.licenseno,
            bio:req.body.bio});
      
      new_user=await new_user.save().catch((err)=>{
                                            let error_msg=dbErrorHandler(err);
                                            res.render("signup",
                                              {error_msg:error_msg}
                                              );
                                          });
      if(new_user){
          let link=req.protocol+"://"+req.get("host")+"/user/verfiy/email/"+new_user._id;
          let msg=await verfiyMail(new_user.email,new_user.name,link);
          if(msg){
            res.redirect("/signin");
          }
          else{
            //need to remove user from database  if mail not send sucessfully
            await usermodel.deleteOne({_id:new_user._id}).catch((err)=>
                        {
                          let error_msg=dbErrorHandler(err)
                          res.render("signup",
                          {
                            error_msg:error_msg
                          });
                        });
            res.render("signup",{error_msg:"Sorry Something went wrong. Please try again"});
          }
        }
}





module.exports={
                get,
                post
              };
