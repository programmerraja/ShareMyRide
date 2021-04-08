// var nodemailer = require('nodemailer');
const crypto=require("crypto");

function generateToken(){
	const token=crypto.randomBytes(10).toString("hex");
	return token;
}

function sendMail(subject,body,to_mail)
{
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: '950618104008@einsteincollege.ac.in',
	    pass: ""
	  }
	});

	var mailOptions = {
	  from: '950618104008@einsteincollege.ac.in',
	  to: to_mail,
	  subject: subject,
	  html:body
	};

	transporter.sendMail(mailOptions, function(err, info){
	  if(err) {
			logError(err);
	    	return -1	
	  } else {
	    console.log('Email sent: ' + info.response);
	    return 1;
	  }
	});
}

function sendPasswordReset(to_mail,user_name,link)
{
	let subject="Reset Your Password";
	let body="<p>Hai "+user_name+",</p>\
	 		<p>A request has been recevied to change the password for your ShareMyRide account. This link only work for 20 minutes</p>\
	 		 <a href='"+link+"'>Reset Password </a>"

	return sendMail(subject,body,to_mail)

}

function verfiyMail(to_mail,user_name,link){

	let subject="Verfiy Your Mail";
	let body="<p>Hai "+user_name+",</p>\
	 		<p>we're happy you signed up for ShareMyRide. To start exploringthe ShareMyRide confirm your email address\
	 		 <a href='"+link+"'>Verfiy Now</a>"

	return sendMail(subject,body,to_mail)
}

class AppError extends Error{
	constructor(err,status_code){
		super(err.message);
		this.status_code=status_code;
		this.message=err.message;
	}
}



/**
 * Get the error message from error object
 */
function dbErrorHandler(err){
	let message = '';
	console.log(err);
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message ="Email already Exist"
                break
            default:
                message = 'Something went wrong. Please try again'
        }
    } 
    else {
            message ="Something went wrong. Please try again"
    }

    return message;
}

function logError(err){
	console.log("------------------------------------");
	console.log("Error:",err);
	console.log("------------------------------------");

}

function convertTimeToString(time)
{
	//copied from stack overflow
	  var timeSplit = time.split(':'),hours,minutes,meridian;
	  hours = timeSplit[0];
	  minutes = timeSplit[1];
	  
	  if (hours > 12) {
	    meridian = 'PM';
	    hours -= 12;
	  } else if (hours < 12) {
	    meridian = 'AM';
	    if (hours == 0) {
	      hours = 12;
	    }
	  } else {
	    meridian = 'PM';
		}
		return [hours,minutes,meridian];
}
function convertTimeToTime(time){
	var timeSplit = time.split(':'),hours,minutes,temp,meridian;
	  hours = parseInt(timeSplit[0]);
	  //spliting min and meridian
	  temp = timeSplit[1].split(" ");
	  minutes=parseInt(temp[0]);
	  meridian=temp[1];

	 
	  if (meridian==="PM") {
	    hours += 12;
	  } else if (meridian==="AM") {
	    if (hours == 12) {
	      hours = 0;
	    }
	  } 
	   //adding zero in front if it is one digit number
	  hours=hours<10?"0"+hours:hours;
	  minutes=minutes<10?"0"+minutes:minutes
	  
		return hours+":"+minutes+":00";
}
module.exports={
	generateToken,
	sendPasswordReset,
	verfiyMail,
	AppError,
	logError,
	dbErrorHandler,
	convertTimeToString,
	convertTimeToTime
};