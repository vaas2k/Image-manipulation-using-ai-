"use server";

import { revalidatePath } from "next/cache";
import User from "../database/model/user";
import { connectToDatabase } from "../database/database";
import { handleError } from "../utils";
import { CreateUser, UpdateUser } from "@/types/types";

const createUserWithCache = (() => {
   
  const userExistsCache: { [key: string]: boolean } = {}; // Object to store cached user existence
    return async (clerkId: string | undefined, user: CreateUser) => {
        try {
            await connectToDatabase();
        } catch (error) {
            handleError(error);
        }

        try {
            if (clerkId !== undefined && userExistsCache[clerkId]) { // Check if the clerkId has been cached
                console.log('User already exists (cached)');
                return 'User already exists (cached)';
            }

            const check = await User.findOne({ clerkId: clerkId });
            if (!check) {
                console.log('User does not exist');
                const newUser = new User({
                    username: user.username,
                    clerkId: user.clerkId,
                    email: user.email,
                    photo: user.photo
                });
                await newUser.save();
                // Update cache
                if (clerkId !== undefined) {
                    userExistsCache[clerkId] = true;
                }
                return JSON.parse(JSON.stringify(newUser));
            } else {
                console.log('User already exists');
                // Update cache
                if (clerkId !== undefined) {
                    userExistsCache[clerkId] = true;
                }
                return check;
            }
        } catch (error) {
            handleError(error);
        }
    };
})();
export { createUserWithCache as createUser };

export const updateUser = async (clerkId: string, user: UpdateUser) => {
  try {
    await connectToDatabase();

    const updateUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updateUser) {
      throw new Error("User Update Fail Miserably");
    }

    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (clerkId: string | undefined) => {
  try {
    await connectToDatabase();
    console.log('asdas');
    const user = await User.findOne({ clerkId : clerkId });

    if (!user) {
      throw new Error("User not Found!");
    }
    console.log(user);
    return user;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not Found!");
    }

    const deletedUser = await User.findOneAndDelete({ _id: user._id });
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};

export const useCredits = async (id: any, creditFee:any) => {
  try{
    await connectToDatabase();
  }catch(error){
    handleError(error);
  }
  
  try {
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: id },
      { creditBalance: creditFee },
      { new: true }
    );
    if (!updatedUserCredits) throw new Error("User credits update failed");
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    console.log(error);
  }
};

export const hasCredits = async (clerkId : string) => {

  try{
    await connectToDatabase();
  }catch(error){
    handleError(error);
  }

  try{
    const check = await User.findOne({clerkId : clerkId});
    if(check && check.creditBalance === 0){
      return false; 
    }
    else {
      return check.creditBalance;
    }
  }catch(error){
    handleError(error);
  }
};

export const addCredits = async (buyerId: string, creditFee:number) => {

  try{
    console.log('DB CHECK');
    await connectToDatabase();
  }catch(error){
    handleError(error);
  }
  
  try {
    console.log('update CHECK');
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: buyerId },
      { creditBalance: creditFee},
      { new: true }
    );

    console.log('Doc CHECK -> ', updatedUserCredits);

    if (!updatedUserCredits) throw new Error("User credits update failed");
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
};





