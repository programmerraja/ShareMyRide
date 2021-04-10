const express=require("express");
//conroller
const userController=require("../controllers/user");
//middleware
const hasAuthHandler=require("../middleware/hasAuthHandler");
const asyncHandler=require("../middleware/asyncHandler");

const checkMailVerified=require("../middleware/checkMailVerified");

const {checkBodyHandler,checkBodyRideHandler}=require("../middleware/checkBodyHandler");

//util
const {generateToken,forgetPassword,AppError,verfiyMail,dbErrorHandler}=require("../util/util");


const router= express.Router();

//route for /user
router.get("/profile",hasAuthHandler,userController.get);
router.get("/profile/id/:id",userController.getProfileById);
router.post("/profile",checkBodyHandler,hasAuthHandler,userController.post);

router.get("/logout",hasAuthHandler,userController.logout);

router.get("/get/myrides/",hasAuthHandler,userController.getMyRides);

router.get("/get/myride/form",hasAuthHandler,userController.getMyRideForm);
router.post("/post/myride/form",checkMailVerified,checkBodyRideHandler,hasAuthHandler,userController.postMyRideForm);

//need to check that current user only changes his form simply user userid in query
router.get("/edit/myride/id/:id",hasAuthHandler,userController.editMyRideForm);
router.post("/edit/myride/id/:id",checkBodyRideHandler,hasAuthHandler,userController.postEditMyRideForm);

router.post("/remove/myride/",hasAuthHandler,userController.removeMyRideForm);

router.get("/verifiy/email/:id",asyncHandler(userController.emailVerified));

router.get("/reset/password/:id",userController.resetPassword);
router.post("/reset/password/:id",asyncHandler(userController.postResetPassword));

router.get("/forget/password/",userController.forgetPassword);
router.post("/forget/password/",asyncHandler(userController.postForgetPassword));


module.exports=router;