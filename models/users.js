import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firebaseId: {
            type: String,
            required: true,
            unique: true,
        },
        userName: {
            type: String,
            minLength: 5,
            maxLength: 128,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            minLength: 10,
            maxLength: 10,
            
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            minLength: 2,
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
