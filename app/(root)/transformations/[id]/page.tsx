'use client'
import { useAppDispatch } from "@/app/hooks";
import { ImageForm } from "@/components/shared/image_form";
import { setImage } from "@/store/slices/imageSlice";
import { Container } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { useEffect,useState } from "react";

const ImageDetails = ({params : {id}}: any) => {

    const {user} = useUser();
    const dispatch = useAppDispatch();
    const [ config , setConfig ] = useState({});
    useEffect(()=>{
        for(let i = 0; i < tranformation_configs.length ;i++){
            if(tranformation_configs[i].link == id){
                setConfig(tranformation_configs[i]);
                dispatch(setImage({
                  type: tranformation_configs[i].type,
                  author: user?.id,
                  author_img : user?.imageUrl
                }));
                break;
            }
        }
    },[id,user,dispatch])

    return (
        <Container maxW={'85%'}>
            <ImageForm configs={config} />
        </Container>
    )
}


const tranformation_configs = [
    {
        name : 'Generative Fill',
        description : 'Enhance Your Image to ultra delusions',
        type : 'fill',
        api : 'null',
        model : 'null',
        link: "generative_fill",
    },
    {
        name : 'Image Restore',
        description : 'Make your image young',
        type : 'restore',
        api : 'null',
        model : 'null',
        link: "restore",
    },
    {
        name : 'Object Remove',
        description : 'Remove an object from the image',
        type : 'prompt',
        api : 'null',
        model : 'null',
        link: "object_remove",
        label: 'Enter Object to remove'
    },
    {
        name : 'Object Recolor',
        description : 'Change color of any object of your choice',
        type : 'recolor',
        api : 'null',
        model : 'null',
        link: "recolor",
        label: 'Enter Object to recolor'
    },
    {
        name : 'Background Remove',
        description : 'Remove the background of the image',
        type : 'bg_remove',
        api : 'null',
        model : 'null',
        link: "background_remove",
    },
]

export default ImageDetails;