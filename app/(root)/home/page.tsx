'use client'
import Home1 from "../page";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { getUserById } from "@/lib/actions/userActions";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/store/slices/userSlice";

const HomePage = () => {
    const {user} = useUser();
    const dispatch = useAppDispatch();
    useEffect(()=>{
        async function getUSer(){
            if(user?.id != undefined){
                const getUser = await getUserById(user?.id);
                console.log(getUser);
                window.sessionStorage.setItem('user',JSON.stringify(getUser));
            }
        }
        getUSer();
    },[user])
    return (
        <div>
           <Home1/> 
        </div>
    )
} 

export default HomePage;