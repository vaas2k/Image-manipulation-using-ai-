'use client'
import { useWidth } from "@/lib/widthCheck";
import { Container, useMediaQuery,Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react";
import {useState , useEffect } from 'react'

const Header = () => {

    const [w] = useMediaQuery('(min-width: 765px)');

    return (
        <Container pt={6} maxW={w ? '80%' : '100%'}>
            
            <Image
            className="header_image"
             src='/Neon Modern Black Friday Banner.png'
             width={'100%'}
             height={w ? '390px' : '180px'}
             style={{objectFit:'cover',borderRadius:'15px'}}
             />
        </Container>
    )
}

export default Header;