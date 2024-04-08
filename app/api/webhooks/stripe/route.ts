import { createTransaction } from "@/lib/actions/transActions";
import stripe from 'stripe'
import { NextResponse } from "next/server";


export async function POST(request : Request){
    console.log('1st');
    const body = await request.text();
    const sig = request.headers.get('stripe-signature') as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY!;

    console.log('2nd');

    let event ;
    try{
        console.log('event');
        event = stripe.webhooks.constructEvent(body,sig,endpointSecret);
    }catch(error){
        console.log('WebHook Error -> ',error);
    }

    const eventType = event?.type;

    if(eventType === 'checkout.session.completed'){
        console.log('type found');
        const {id,metadata,amount_total} = event.data.object;
        console.log('Metadata -> ',metadata);

        const transaction = {
            stripeId: id,
            amount: amount_total ? amount_total / 100 : 0,
            plan: metadata?.plan || "",
            credits: Number(metadata?.credits) || 0,
            buyerId: metadata?.buyerId || "",
            createdAt: new Date(),
        };

        console.log(transaction);

        const newTransaction = await createTransaction(transaction);

        console.log('transaction done');
        return NextResponse.json({ message: "OK", transaction: newTransaction });
    }
    return new Response("", { status: 200 });
}