//for env
require("dotenv").config();

//node modules
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore =require('connect-mongo').default;
const passport = require("./passport/setup");
//middleware
const errorHandler=require("./middleware/errorHandler");
//routers
const signinrouter=require("./routes/signin");
const signuprouter=require("./routes/signup");
const searchrouter=require("./routes/search");
const userrouter=require("./routes/user");

const app=new express();
const MONGO_URI =process.env.DBURL;

//db connect
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true ,useUnifiedTopology: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//middleware's
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
				  secret: 'secret',
				  resave: false,
				  saveUninitialized: false,
				  cookie: { secure: false },
				  store: MongoStore.create( {mongoUrl:MONGO_URI})
				})
		);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// setting value
app.set("view engine" ,"ejs");
app.set("views","./views");

let port=process.env.PORT || 3000;


//routing

app.use("/public",express.static(path.join(__dirname+"/public")));
app.use("/signin",signinrouter);
app.use("/signup",signuprouter);
app.use("/search",searchrouter);
app.use("/user",userrouter);



app.get("/",(req,res)=>{
	res.render("index");
})

//error handler
app.use(errorHandler);

//404 page 
app.get("/*",(req,res)=>{
	res.send("<h1>404 Not Found</h1>");
})

process.on("uncaughtException",()=>{
	

})

app.listen(port,()=>{console.log("server started")});


	