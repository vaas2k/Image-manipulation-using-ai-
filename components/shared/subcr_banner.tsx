import { Stack, Flex,Text, HStack } from "@chakra-ui/react";
import { Gem,Check,X } from 'lucide-react';
import { Button } from "../ui/button";

const Subscription_Card = (props : any) => {

    return(
        <Stack style={{border:'1px solid gray',width:'300px',borderRadius:'10px'} }>

            <Flex gap={4} py={6} className="flex items-center justify-center flex-col" >
                <Gem size={'50px'} />
                <Text color={'purple'}>{props.name}</Text>
                <Text fontSize={'30px'}>$ {props.price}</Text>
                <Text opacity={'70%'}>{props.credits} Credits</Text>
            </Flex>

            <Flex gap={6} py={6} className="flex items-center justify-center flex-col" >
                
            {props.inclusions.map((i:any)=>{
                return(
                    <HStack>
                    {i.isIncluded ? <Check color='blue' size={'15px'}/> : <X color='red' size={'15px'} />}
                    <Text fontSize={'13px'}>{i.label}</Text>
                </HStack>
                )
            })}

            {props.plan == props.id ?  <Button disabled >Current Plan</Button> : <Button>Upgrade Plan</Button>}
            </Flex>
            
        </Stack>
    )

}

export default Subscription_Card;