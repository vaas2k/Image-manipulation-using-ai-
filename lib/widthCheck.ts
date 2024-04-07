'use client' 
import { useState,useEffect } from "react";


export const useWidth = () => {
  
  if(typeof window !== 'undefined'){
    const [width, setWidth] = useState<any>(window.innerWidth);
    useEffect(() => {
      function chngWidth() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", chngWidth);
      return () => window.removeEventListener("resize", chngWidth);
    }, []);
    
    return width;
  }

}