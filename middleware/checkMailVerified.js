

function checkMailVerified(req,res,next){
	if(!req.user.is_email_verified){
		next()
		return
	}
	res.render("myRideForm",{error_msg:"Please verify your mail to post the ride"});
	return;
	

}

module.exports=checkMailVerified;	