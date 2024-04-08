import { SignedIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {Text} from '@chakra-ui/react'
import { Button } from "@/components/ui/button";
import {plans} from '@/constants/constants';
import { getUserById } from "@/lib/actions/userActions";
import HeaderCred from "@/components/shared/headerCredits";
import Checkout from "@/components/shared/checkComponent";
import { DiamondPercent,Check,X } from "lucide-react";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  console.log(user);

  return (
    <>
      <HeaderCred
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name} className="w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-8 shadow-xl shadow-purple-200/20 lg:max-w-none">
              <div className="flex items-center jusitify-center gap-[10px] flex-col">
                <DiamondPercent size={'30px'}/>
                <Text fontSize={'20px'} className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </Text>
                <Text fontSize={'18px'} className="h1-semibold text-dark-600">${plan.price}</Text>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    {inclusion.isIncluded ? <Check color="navy"/> : <X color="red"/>}
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button variant="outline" className="w-full rounded-full bg-purple-100 bg-cover text-purple-500 hover:text-purple-500;">
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user.clerkId}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;