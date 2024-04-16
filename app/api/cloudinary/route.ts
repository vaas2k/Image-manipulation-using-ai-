
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function POST(request : Request) {

    const requestBody = await request.json();
    
    try{
        const response = cloudinary.image(requestBody.image, {transformation: [
            {effect: "sepia"},
            {height: 100, width: 130, crop: "fill"},
            {angle: 20}
            ]})


        if(!response){
            return new Response('Request to Cloudinary Failed');
        }
        console.log(response);
        return new Response(response);

    }catch(error){
        console.log(error);
    }

}