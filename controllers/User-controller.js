import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { User } from "../models/users.js";


export const getUsers = async(req,res)=>{
    try {
        const result = await User.find()
        const totalCount = await User.estimatedDocumentCount();
        console.log(result);
        res.status(200).json({
            success: "true",
            totalCount: totalCount,
            body: result
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong!" 
        })
    }
}

export const getUsersByName = async(req,res)=>{
    try {
        const key = req.params.key;
        console.log(key);
        const result = await User.find({
               "userName": {$regex: key,$options: "i"}
        });
        const resultCount = Object.keys(result).length;
        console.log(result);
        res.status(200).json({
            message: "found",
            result: resultCount,
            body: result
        })       
    } catch (e) {
        res.status(500).json({
            status: "failed",
            error: e.message
        })
        console.log(e.message);
    }
}

export const getUserByFirebaseId = async(req,res)=>{
    const firebaseid = req.params.firebaseid;
    console.log(firebaseid);
    try {
        const result = await User.find({firebaseId: firebaseid}).exec();
        if(!result){
            return res.status(404).json({
                message: "User does not exists"
            })
        }
        console.log(result);
        res.status(200).json({
            success: "true",
            body: result
        })
    } catch (e) {
        res.status(500).json({
            status: "failed",
            error: e.message
        })
    }
}

export const checkIfUserExist = async( req, res) => {
    const email = req.params.email;
    try {
        const result = await User.findOne({email: email});
        if(result){
            res.status(200).json({
                success: 'true',
                userFound: 'true',
                user: result
            })
        }else{
            res.status(200).json({
                success: "true",
                userFound: "false"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: 'failed',
            message: "something went wrong",
            error: err.message
        })
    }
}

export const postUsers = async(req,res)=>{
    console.log(req.body);
    const {
        firebaseId,
        fullName,
        userName,
        email,
        password,
        phoneNumber,
        instaId,
        profileImage,
        linkedIn,
        github
    } = req.body;
    try {
        const result = await User.findOne({email: email});
        if(result){
            return res.status(401).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,12);
        console.log(hashedPassword);
        const newUser = await User.create({
            firebaseId: firebaseId,
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            instaId: instaId,
            profileImage: profileImage,
            phoneNumber:phoneNumber,
            linkedIn: linkedIn,
            github: github
        })
        console.log(newUser);
        res.status(201).json({
            success: true,
            body: newUser
        })
        
    } catch (e) {
        res.status(500).json({
            status: "failed",
            error: e.message
        })        
    }    
}

export const patchUser = async(req,res)=>{
    const id = req.params.id;
    const details = req.body;
    try {
        const userFound = await User.findByIdAndUpdate(id,details,{new: true});
        if(!userFound){
            return res.status(400).json({message: "User not found"})
        }
        res.status(202).json({
            modified:"true",
            body: userFound
        })
    } catch (e) {
        res.status(500).json({
            status: "failed",
            error: e.message
        })
    }
    const userFound = await User.findByIdAndUpdate(id,details);
    
}

export const deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({message: "User not found"})
        }
        res.status(202).json({
            success: "true",
            deleted: result
        })
    } catch (e) {
        res.status(501).json({
            status: "failed",
            error: e.message
        })
    }
}