
const {AppError}=require("../util/util");

function hasAuthHandler(req,res,next){
	if(req.user){
		next()
		return
	}
	res.redirect("/signin");

}

module.exports=hasAuthHandler;	