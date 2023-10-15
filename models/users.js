import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firebaseId: {
            type: String,
            required: true,
            
        },
        userName: {
            type: String,
            minLength: 1,
            maxLength: 128,
            required: true,
            
        },
        phoneNumber: {
            type: String,
            minLength: 10,
            maxLength: 10,
            
        
        },
        password: {
            type: String,
            
        },
        email: {
            type: String,
            
        },
        fullName: {
            type: String,
            minLength: 1,
            maxLength: 255,
            
        },
        omegeleReports: {
            type: Number,
            default: 0,
        },
        OmegleAllowed: {
            type: Boolean,
            default: true,
        },
        favTeamVote: {
            type: Boolean,
            default: false,
        },
        instaId: {
            type: String,
            
            default: "",
            maxLength: 250,
        },
        profileImage: {
            type: String,
            maxLength: 255,
            default: "",
            
        },
        totalScore: {
            type: Number,
            default: 0,
        },
        linkedIn: {
            type: String,
            default: "",
            maxLength: 255,
            
        },
        github: {
            type: String,
            default: "",
            maxLength: 255,
            
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
