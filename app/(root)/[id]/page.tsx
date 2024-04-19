'use client'
import { Flex, Image, Stack , Text} from "@chakra-ui/react";
import { useRouter } from "next/router";


const ShowImage = ({searchParams}:any) => {
    console.log(searchParams);

    return(
        <>
        
        <Flex className="flex items-center justify-center gap-[90px] flex-wrap">
            <Stack>
                <Text fontFamily={'sans-serif'} fontSize={'22px'} fontWeight={'600'}>Original</Text>
                <Image
                className="rounded-lg"
                src={searchParams.original} 
                width={'500px'}
                height={'auto'}
                />
            </Stack>

            <Stack>
            <Text fontFamily={'sans-serif'} fontSize={'22px'} fontWeight={'600'}>Transformed</Text>
                <Image
                className="rounded-lg"
                src={searchParams.transformed} 
                width={'500px'}
                height={'auto'}
                />
            </Stack>
        </Flex>
        </>
    )
}

export default ShowImage;