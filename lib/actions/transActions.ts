"use server"

import { CheckoutTransactionParams, CreateTransactionParams } from "@/types/types"
import { redirect } from "next/navigation";
import Stripe from 'stripe'
import Transaction from "../database/model/transactions";
import { connectToDatabase } from "../database/database";
import { addCredits } from "./userActions";

export const checkoutCredits =  async (transaction : CheckoutTransactionParams) => {
    console.log(transaction);
    try{
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const amount = Number(transaction.amount) * 100;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data : {
                        currency : 'usd',
                        unit_amount : amount,
                        product_data :{
                            name : transaction.plan
                        }
                    },
                    quantity : 1
                }
            ],
            metadata: {
                plan : transaction.plan,
                credits : transaction.credits,
                buyerId : transaction.buyerId
            },
            mode : 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/home`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        })

        return session.url!;
    }catch(error){
        console.log(error);
    }

}

export const createTransaction = async (transaction : CreateTransactionParams) => {

    try{
        await connectToDatabase();
    }catch(error){
        console.log(error);
    }

    try{

        const newTransaction = await Transaction.create({
            ...transaction, buyer : transaction.buyerId
        })

        await addCredits(transaction.buyerId,transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));

    }catch(error){
        console.log(error);
    }
}