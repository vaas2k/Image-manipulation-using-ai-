'use server'

import { revalidatePath } from "next/cache"
import User from "../database/model/user"
import { connectToDatabase } from "../database/database"
import { handleError } from "../utils"
import { CreateUser,UpdateUser } from "@/types/types"


export const createUser = async (user : CreateUser) => {
    
    try{
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    }
    catch(error){
        handleError(error);
    }
}

export const updateUser = async (clerkId:string,user:UpdateUser) => {

    try{
        await connectToDatabase();

        const updateUser = await User.findOneAndUpdate({clerkId},user,{new : true})

        if(!updateUser){ throw new Error('User Update Fail Miserably')};

        return JSON.parse(JSON.stringify(updateUser));

    }catch(error){
        handleError(error);
    }
}


export const getUserById = async (clerkId: string) => {

    try{

        await connectToDatabase();

        const user = await User.findOne({clerkId});

        if(!user){throw new Error('User not Found!')}

        return JSON.parse(JSON.stringify(user));
    }catch(error){
        handleError(error);
    }
}

export const deleteUser = async (clerkId: string) => {

    try{
        await connectToDatabase();

        const user = await User.findOne({clerkId});

        if(!user){throw new Error('User not Found!')}

        const deletedUser = await User.findOneAndDelete({_id : user._id});
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    }catch(error){
        handleError(error);
    }
}


export const updateCredits = async (clerkId : string,creditFee : Number) => {

    try{
        await connectToDatabase();

        const updatedUserCredits = await User.findOneAndUpdate(
            { clerkId: clerkId },
            { $inc: { creditBalance: creditFee }},
            { new: true }
          )

        if(!updatedUserCredits) throw new Error("User credits update failed");

        return JSON.parse(JSON.stringify(updatedUserCredits));
    }catch(error){
        handleError(error);
    }
}