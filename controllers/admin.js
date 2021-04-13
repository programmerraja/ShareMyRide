//node modules
const passport = require("passport");
//util
const {
    AppError
} = require("../util/util");
//models
const Ride = require("../models/Ride");
const User = require("../models/Users");

//handling GET /signin
function get(req, res) {
    //render this only if he not sigin as user
        res.render("admin");

}

async function getUsers(req, res) {
    let users = await User.find({});
    res.json({
        status: "Sucess",
        users: users
    });
}

async function getUserById(req, res) {
    if (req.params.id) {
        let id = req.params.id;
        let user = await User.findOne({
            _id: id
        });
        res.json({
            status: "Sucess",
            user: user.scammer
        });
    } else {
        res.json({
            status: "Failure",
            error_msg: "Don't be fool!"
        })
    }
}

async function removeUserById(req, res) {
    if (req.body.user_id) {
        let user_id = req.body.user_id;
        let user = await User.deleteOne({
            _id: user_id
        });
        if(user){

                res.json({
                    status: "Sucess",
                    error_msg: "sucessfully removed"
                });
        }
    } else {
        res.json({
            status: "Failure",
            error_msg: "Don't be fool!"
        })
    }
}

async function verifiyUserById(req, res) {
    if (req.body.user_id) {
        let user_id = req.body.user_id;
        let user= await User.findOneAndUpdate({_id:user_id},{is_verified:true});
        if(user){
            res.json({
                status: "Sucess",
                error_msg: "sucessfully Verified"
            });
        }
    } else {
        res.json({
            status: "Failure",
            error_msg: "Don't be fool!"
        })
    }
}

module.exports = {
    get,
    getUsers,
    getUserById,
    removeUserById,
    verifiyUserById,
};