const mongoose = require("mongoose");
// Create Schema
const UserSchema = new mongoose.Schema(
                                    {
                                        name: {
                                            type: String
                                        },
                                        gender:{
                                            type:String
                                        },
                                        email: {
                                            type: String,
                                            required: true,
                                            unique: true
                                        },
                                        is_email_verified: {
                                            type: Boolean,
                                            default: false
                                        },
                                        password: {
                                            type: String,
                                            required:true
                                        },
                                        date_of_birth:{
                                            type:Date,
                                            required:true
                                            
                                        },
                                        phoneno:{
                                            type:Number,

                                        },
                                        whatsappno:{
                                            type:Number
                                        },
                                        drivingexpereince:{
                                            type: String,
                                            required:true
                                        },
                                        licenseno:{
                                            type:String,
                                            required:true
                                        },
                                        bio:{
                                            type:String
                                        },
                                        password_reset_token:{
                                            type:String
                                        },
                                        password_reset_expires:{
                                                type:Date
                                        }
                                    }
                                );

User = mongoose.model("users", UserSchema);
module.exports = User