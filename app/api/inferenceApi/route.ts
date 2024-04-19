import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import axios from 'axios';

const replicate = new Replicate({
    auth : process.env.REPLICATE_API_TOKEN!
});


export async function POST (request : Request ) {

    const requestBody = await request.json();
    console.log(requestBody);
    
    if(!requestBody.image){
       return new NextResponse('Image Missing');
    }
    
    const fill = async () => {
        return 'fill';
    }

    const object_remove = async () => {
      if(!requestBody.image || !requestBody.prompt){return 'Input Missing'}

      const input = {
        image_path: requestBody.image,
        objects_to_remove: requestBody.prompt
    };
    
    const output = await replicate.run("sujaykhandekar/object-removal:153b0087c2576ad30d8cbddb35275b387d1a6bf986bda5499948f843f6460faf", { input });
    console.log(output)
    return output
    }

    const bg_remove = async () => {
      if(!requestBody.image){return 'Image Missing'}
        const input = {
            image: requestBody.image
        };
        
        const output = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", { input });
        console.log(output)
        return output;
    }
    const restore = async () => {
        return 'resotre';
    }

    const inImageChanging = async () => {
      const input = {
        source_image: requestBody.image,
        target_prompt: requestBody.prompt
    };
    
    const output = await replicate.run("adirik/masactrl-stable-diffusion-v1-4:4e86d80ab64a8395e7fd327d34fe85d240a3d9e8706b7144864ba981eba3dfa6", { input });
    console.log(output)
    return output
    }


    let res: any = null;
    switch (requestBody.type) {
      case "fill":
        res = await inImageChanging();
        return new NextResponse(res);
      case "object_remove":
        res = await object_remove();
        return new NextResponse(res);
      case "bg_remove":
        res = await bg_remove();
        return new NextResponse(res);
      case "restore":
        res = await restore();
        return new NextResponse(res);
      default:
        return new NextResponse("Failed");
    }
    
}