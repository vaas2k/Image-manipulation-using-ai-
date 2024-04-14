'use client'
import { useEffect } from "react";
import Home1 from "../page";
import { useUser } from "@clerk/nextjs";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getUserById } from "@/lib/actions/userActions";
import { setUser } from "@/store/slices/userSlice";

const HomePage = () => {

    const { isSignedIn, isLoaded, user } = useUser();
    const cur_user_id = useAppSelector((state) => {return state.userSlice.clerkId});
    const dispatch = useAppDispatch();
    return (
        <div>
           <Home1/> 
        </div>
    )
} 

export default HomePage;