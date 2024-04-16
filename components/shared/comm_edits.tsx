
import {Flex, Box, Text, Image, Container,Link} from '@chakra-ui/react'
import { Search } from 'lucide-react';

const Edits = ({ images }: { images: any[] }) => { 
    return (
        <>
        <Flex pt={8} px={12} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'600'} fontSize={'17px'}>
                Community Edits
            </Text>

            <Search />
        </Flex>

        <Container maxW={'95%'}>

        <Flex py={8} wrap={'wrap'} style={{gap:'33px'}}>
        {images.map((i:any) => (
            <Link key={i.id} href={i.transformation_url} isExternal // Add link and isExternal prop to Link component
              className="group relative rounded-lg overflow-hidden shadow-md w-64 h-64 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <Image
                src={i.transformation_url}
                alt={i.title} // Add alt text for accessibility
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300 ease-in-out">
                <Text className="absolute bottom-2 left-2 text-white font-medium truncate">{i.title}</Text>
              </div>
            </Link>
          ))}
        </Flex>
        
        </Container>
        </>
    )
}
export default Edits;