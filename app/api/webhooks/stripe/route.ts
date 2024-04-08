import { createTransaction } from "@/lib/actions/transActions";
import stripe from 'stripe'
import { NextResponse } from "next/server";


export async function POST(request : Request){
    const body = await request.text();
    const sig = request.headers.get('stripe-signature') as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY!;

    let event ;
    try{
        event = stripe.webhooks.constructEvent(body,sig,endpointSecret);
    }catch(error){
        console.log('WebHook Error -> ',error);
    }

    const eventType = event?.type;

    if(eventType === 'checkout.session.completed'){
        const {id,metadata,amount_total} = event.data.object;

        const transaction = {
            stripeId: id,
            amount: amount_total ? amount_total / 100 : 0,
            plan: metadata?.plan || "",
            credits: Number(metadata?.credits) || 0,
            buyerId: metadata?.buyerId || "",
            createdAt: new Date(),
        };

        const newTransaction = await createTransaction(transaction);
        return NextResponse.json({ message: "OK", transaction: newTransaction });
    }
    return new Response("", { status: 200 });
}