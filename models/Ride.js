const mongoose = require("mongoose");

// Create Schema

//need to change user_id type to id 
const RideSchema = new mongoose.Schema(
                                    {
                                        user_id:{
                                            type:String,
                                             required:true
                                        },
                                        from:{
                                            type:String,
                                            required:true
                                        },
                                        to:{
                                            type:String,
                                            required:true
                                        },
                                        date:{
                                            type:Date,
                                            required:true
                                        },
                                        time:{
                                            type:String,
                                            required:true
                                        },
                                        type:{
                                            type:String,
                                            required:true
                                        },
                                        passenger:{
                                            type:Number,
                                            required:true

                                        },
                                        amount:{
                                            type:Number,
                                            required:true                                            
                                        }
                                    },
                                
                                );

Ride = mongoose.model("rides", RideSchema);

module.exports = Ride