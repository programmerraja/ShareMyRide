
const Ride = require("../models/Ride");
const User = require("../models/Users");


async function post(req,res){
	if(req.body){
		 let {from,to,type,date}=req.body;

		 from=from.toLowerCase();
		 to=to.toLowerCase();
		 //need to avoid duplicate in it 
		 //using object to find the ride that not repeated O(n) time
		 let temp={};
		 let rides=[],ride;

		 ride= await Ride.find({from:from,date:{"$gte":date}});
		
	
		 if(ride.length>0){
		 	for(let i=0;i<ride.length;i++){
		 		temp[ride[i]._id]="1";
		 		rides.push(ride[i]);
		 	}
		 	
		 }
		 
		 ride= await Ride.find({to:to,date:{"$gte": date}});
		 
		if(ride.length>0){
		 	for(let i=0;i<ride.length;i++){
		 		//only push the ride if it it not already present
		 		if(!temp[ride[i]._id]){
		 			rides.push(ride[i]);
		 		}
		 	}
		}
	

		res.render("searchResult",{rides,search:{from,to,type,date},user:req.user});
		return
	}
	//say user to enter the search options

	
}


async function getSpecificRide(req,res) {
	if(req.params.id){
		let id=req.params.id;
		 let ride= await Ride.findOne({_id:id});
		 owner=await User.findOne({_id:ride.user_id});
		 res.render("vehicleDetail",{ride,owner:{id:owner._id,name:owner.name},user:req.user})
	}
	
	
}  
module.exports={
					post,
					getSpecificRide	
				};