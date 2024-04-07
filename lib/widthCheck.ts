'use client' 
import { useState,useEffect } from "react";

export const useWidth = () => {

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      function chngWidth() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", chngWidth);
      return () => {window.removeEventListener("resize", chngWidth)

      return width;
      };
    }, []);
    
}