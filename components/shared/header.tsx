'use client'
import { Container, useMediaQuery } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react";
import {useState , useEffect } from 'react'

const Header = () => {

    const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function chngWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", chngWidth);
    return () => window.removeEventListener("resize", chngWidth);
  }, []);

    return (
        <Container pt={6} maxW={width > 765 ? '80%' : '100%'}>
            <Image
             src='/bgheader.jpg'
             width={'100%'}
             height={width > 765 ? '350px' : '200px'}
             style={{objectFit:'cover',borderRadius:'15px'}}
             />
        </Container>
    )
}

export default Header;