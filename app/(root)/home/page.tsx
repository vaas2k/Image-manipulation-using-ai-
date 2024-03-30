'use client'
import { useEffect, useState } from "react";
import Home1 from "../page";
import { useAppDispatch } from "@/app/hooks";
import { useUser } from "@clerk/nextjs";

const ShowHome = () => {
    const { user, isSignedIn } = useUser();

    console.log(user?.id,user?.imageUrl,user?.fullName);

    return (
        <Home1 />
    );
};

export default ShowHome;
