const express=require("express");
const {getHandler}=require("../controllers/signin");
const {postHandler}=require("../controllers/signin");


const router= express.Router();
// signin
router.get("/",getHandler);
router.post("/",postHandler);


module.exports=router;