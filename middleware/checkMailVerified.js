

function checkMailVerified(req,res,next){
	if(req.user.is_email_verified){
		if(req.user.is_verified){
			next()
			return
		}
		else{
			res.render("myRideForm",{error_msg:"Please wait untill We verify your Id"});
			return
		}
	}
	res.render("myRideForm",{error_msg:"Please verify your mail to post the ride"});
	return;
	

}

module.exports=checkMailVerified;	