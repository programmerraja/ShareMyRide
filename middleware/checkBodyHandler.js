

function checkBodyHandler(req,res,next){
	let {name,
		email,
		password,
		gender,
		phoneno,
		whatsappno,
		licenseno,
		drivingexpereince,bio}=req.body;
	if((name && email && password  && gender && phoneno && whatsappno && licenseno && drivingexpereince && bio)){
		res.locals.is_correct=true;
	}
	else{
		res.locals.is_correct=false;
	}	
	next();

}
function checkBodyRideHandler(req,res,next){
	 let {from,to,type,passenger,amount,time,date}=req.body
	 if((from && to && type && amount && time && date && passenger)){
		res.locals.is_correct_ride=true;

	 }
	 else{
		res.locals.is_correct_ride=false;
	 }
	 next();
}

module.exports={checkBodyHandler,checkBodyRideHandler};	