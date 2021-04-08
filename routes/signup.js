const express=require("express");
const signupController=require("../controllers/signup")
const {checkBodyHandler}=require("../middleware/checkBodyHandler");


const router= express.Router();

router.get("/",signupController.get);

router.post("/",checkBodyHandler,signupController.post);


module.exports=router;