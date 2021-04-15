
const Ride = require("../models/Ride");
const User = require("../models/Users");


async function post(req,res){
	if(req.body){
		 let {from,to,type,date}=req.body;
		 type=type.toLowerCase();
		 from=from.toLowerCase();
		 to=to.toLowerCase();
		 let rides= await Ride.find({from:from,to:to,date:{"$gte":date},type:type});
		 res.render("searchResult",{rides,search:{from,to,type,date},user:req.user});
	}
	//say user to enter the search options
}


async function getSpecificRide(req,res) {
	if(req.params.id){
		let id=req.params.id;
		 let ride= await Ride.findOne({_id:id});
		 if(ride){
		 	owner=await User.findOne({_id:ride.user_id});
		 	res.render("vehicleDetail",{ride,owner:{id:owner._id,name:owner.name},user:req.user})
		 	return
		 }
		 res.render("error");
	}

	
	
}  
module.exports={
					post,
					getSpecificRide	
				};	
