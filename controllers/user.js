//node modules
const mongoose=require("mongoose");
const bcrypt = require ('bcrypt');
//models
const ridemodel=require("../models/Ride");
const usermodel=require("../models/Users");
//util
const {generateToken,sendPasswordReset,AppError,dbErrorHandler,convertTimeToString,convertTimeToTime}=require("../util/util");

//handling GET /signin
function get(req,res) {
	res.render("userProfile",{user:req.user});
}

//handling GET /user/logout
function logout(req, res) {
    req.session.destroy();
    res.redirect("/");
}

async function getProfileById(req,res) {
	if(req.params.id){
		let id=req.params.id;
		let user_profile=await usermodel.findOne({_id:id});
		if(user_profile){
			res.render("userProfileId",{user_profile,user:req.user});
			return;
		}

		//render 404
	}
}

async function post(req,res){
	//need to check if user realy change anything else dont update if user change his mail 
	//send the confirmation message
	if(res.locals.is_correct){
		let {name,
			email,
			password,
			new_password,
			date_of_birth,
			gender,
			phoneno,
			whatsappno,
			licenseno,
			drivingexpereince,bio}=req.body;
		//don't remove this 
		let old_password=password;

		let user_id=req.user._id;
        
        let user= await usermodel.findOne({_id:user_id});
        
        if (user) {
   		  if(bcrypt.compareSync(old_password,user.password)){
   		  	if(new_password){
   		  	    new_password=bcrypt.hashSync(new_password, 2);
   		  		user.password=new_password;
   		  	}
   		  	user.name=name;
   		  	user.email=email;
   		  	user.gender=gender;
   		  	user.date_of_birth=date_of_birth;
   		  	user.phoneno=phoneno;
   		  	user.whatsappno=whatsappno;
   		  	user.licenseno=licenseno;
   		  	user.drivingexpereince=drivingexpereince;
   		  	user.bio=bio;
   		  	user=await user.save().catch((err)=>
   		  								{
   		  									let error_msg=dbErrorHandler(err)
			         						res.render("userProfile",
			         						{
			         						user:req.user,
			          						name:req.user.name,
			          						error_msg:error_msg
			          						});
			         					});
   		  	if(user){
   		  		res.render("userProfile",{user:user,
					 		 			  error_msg:"Sucess fully updated"});
   		  	} 
   		  	
   		 }
   		 else{
   		 	res.render("userProfile",{user:req.user,
							 		  error_msg:"Password does not match"});
   		     }
   	    }
   	    return;
	}   
	if(!req.body.password){
		res.render("userProfile",{user:req.user,
							      error_msg:"Please provide password to update your account"});
		return;
	}
	res.render("userProfile",{user:req.user,
							  error_msg:"Please provide all data"});

 }

function logout(req,res){
		req.session.destroy();
		res.redirect("/");
}

async function getMyRides(req,res){
	let user_id=req.user._id;
	let rides=await ridemodel.find({user_id:user_id});
	if(rides){
		res.render("myRides",{user:req.user,rides});
	}
	//render 404 

}
function getMyRideForm(req,res){
	res.render("myRideForm",{user:req.user});
}

async function postMyRideForm(req,res){
	if(res.locals.is_correct_ride){
		 let {from,to,type,model,passenger,amount,time,date}=req.body;
		 //converting to lower case
		 from=from.toLowerCase();
		 to=to.toLowerCase();

		 let time_array=convertTimeToString(time);
		 time=time_array[0]+":"+time_array[1]+" "+time_array[2];
		 let user=req.user;
		 let user_id=user._id;
		 new_ride=new ridemodel({
		 						user_id:user_id,
			  					from,
			  					to,
			  					type,
			  					model,
			  					passenger,
			  					amount,
			  					time,
			  					date
		  				    });

		 new_ride.save().catch((err)=>{
		  								let error_msg=dbErrorHandler(err);
		         						res.render("myRideForm",
			          							   {error_msg:error_msg}
		          						           );
		         					   });
		 if(new_ride){
			res.redirect("/user/get/myrides/");
		 }
	}
	else{
		res.render("myRideForm",
             	  {error_msg:"Please provide all data"}
		           );
	}
		
}
async function editMyRideForm(req,res){
	if(req.params.id){
		//used user id to avoid other user to edit the ride
		let user_id=req.user._id;
		let id=req.params.id;
		let ride=await ridemodel.findOne({user_id:user_id,_id:id});
		if(ride){
			//converting time format so we can set that as value  
			ride.time=convertTimeToTime(ride.time);
			res.render("myRideForm",{user:req.user,ride:ride});
			return
		}
	}
	// render the 404 page 
}

async function postEditMyRideForm(req,res){
	if(res.locals.is_correct_ride && req.params.id){

		 let id=req.params.id;
		 let {from,to,type,model,passenger,amount,time,date}=req.body;
		 let time_array=convertTimeToString(time);
		 time=time_array[0]+":"+time_array[1]+" "+time_array[2];
		 
		 let user=req.user;
		 let user_id=user._id;
		 
		 ride=await ridemodel.findOneAndUpdate({
                user_id:user_id,_id:id
            },{
		 						user_id:user_id,
			  					from,
			  					to,
			  					type,
			  					model,
			  					passenger,
			  					amount,
			  					time,
			  					date
		  				    });

		 
		 if(ride){
			res.redirect("/user/get/myrides/");
		 }
	}
	else{
		res.render("myRideForm",
             	  {error_msg:"Please provide all data"}
		           );
	}
		
}
async function removeMyRideForm(req,res){
	if(req.body.id){
		 let id=req.body.id;	 
		 let user=req.user;
		 let user_id=user._id;
		 let ride=await ridemodel.deleteOne({_id:id,user_id,user_id});
		 //need to show user if some thing bad for better use js in client side 
		 if(ride){
		 	res.json({"status":"Sucess",msg:"Successfully Removed"});
		 }
		 else{
		 	res.json({"status":"Failure",msg:"Sorry Something went wrong!"});
		 }

	}
		 	 
		
}


async function forgetPassword(req,res){

		res.render("forgetPassword",{user:""})

}
//handling POST /user/forget/password
async  function postForgetPassword(req,res){

	if(req.body.email){
		let email=req.body.email;
		var user=await usermodel.findOne({email:email});
		if(user){
			let token=generateToken();
			let link=req.protocol+"://"+req.get("host")+"/user/reset/password/"+token;

			//we adding 20 mins to current date and converting in to mili sec
			let password_reset_expires=Date.now()+20*60*1000;	
			//updating the user token
			let new_user=await usermodel.findOneAndUpdate({_id:user._id},
														  {password_reset_token:token,
														   password_reset_expires:password_reset_expires});

			//sending mail to user
			let msg=await sendPasswordReset(user.email,user.name,link);
			if(msg){
				res.json({status:"Sucess",msg:"Check your mail to reset the password"});
			}
			else{
				res.json({status:"Failure",msg:"Sorry Something went wrong. Please try again"});
			}
			return
		}
		res.json({status:"Failure",msg:"No user exit with given gmail"})
	}
}

//handling GET /user/reset/password
async function resetPassword(req,res){
		res.render("resetPassword",{user:""})

}

//handling POST /user/reset/password
async  function postResetPassword(req,res){

	if(req.params && req.body.password){

		let password_reset_token = req.params.id;
		let new_password=req.body.password;
		//finding the user
		var user=await usermodel.findOne({password_reset_token:password_reset_token,
										 password_reset_expires:{$gt:Date.now()}});
		if(user){
			let hash = bcrypt.hashSync(new_password, 2);
			let new_user=await usermodel.findOneAndUpdate({_id:user._id},{password:hash});
			res.json({status:"Sucess",msg:"Password Updated"});
		}
		else{
			res.json({status:"Failure",msg:"Link Expires"});
		}
		return
	}
	res.status(400).json({status:"Failure",msg:"Link not found"});

}

async function emailVerified(req,res){
	if(req.params){
		let user_id =req.params.id;
		var user=await usermodel.findOne({_id:user_id});
		if(user){
			user.is_email_verified=true;
			new_user=await user.save();
			res.render("emailVerified",{user:""});
			return
		}
		res.render("error")
	}
}

module.exports=
	{
		get,
		logout,
		getProfileById,
		post,
		getMyRideForm,
		editMyRideForm,
		postEditMyRideForm,
		postMyRideForm,
		removeMyRideForm,
		getMyRides,
		forgetPassword,
		resetPassword,
		emailVerified
	};