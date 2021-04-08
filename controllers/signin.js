const passport = require("passport");

//handling GET /signin
function getHandler(req,res) {
	res.render("signin");
}

function postHandler(req,res,next){
	passport.authenticate('local', function(err, user, info) {
    if (err) {
     return next(err);
     }
    if (!user) { 
    	return res.render('signin',{error_msg:info.message});
    	}

    //if user sucessfully login we need to call manually the login function
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/user/profile',{user:user});
    });
  })(req, res, next);	
}

module.exports={getHandler,postHandler};