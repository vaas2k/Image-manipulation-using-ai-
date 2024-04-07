'use client'
import { useWidth } from "@/lib/widthCheck";
import { Container, useMediaQuery } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react";
import {useState , useEffect } from 'react'

const Header = () => {

    const w = useWidth();

    return (
        <Container pt={6} maxW={w > 765 ? '80%' : '100%'}>
            <Image
             src='/bgheader.jpg'
             width={'100%'}
             height={w > 765 ? '350px' : '200px'}
             style={{objectFit:'cover',borderRadius:'15px'}}
             />
        </Container>
    )
}

export default Header;