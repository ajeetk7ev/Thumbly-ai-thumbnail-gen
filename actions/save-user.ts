"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import {prisma} from '@/lib/prisma';

export const saveUser = async () => {
    try {
        const clerkUser = await currentUser();
        
        if (!clerkUser) {
            return;
        }

        const userId = clerkUser.id;
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const firstName = clerkUser.firstName ?? "";
        const lastName = clerkUser.lastName ?? "";
        const imageUrl = clerkUser.imageUrl ?? "";
        

        

        const user = await prisma.user.findUnique({
             where:{
                clerkId:userId
             }
        })

        if (!user) {
            await prisma.user.create({
                data: {
                    clerkId: userId,
                    email: email,
                    fullName:firstName+lastName,
                    profilePictureUrl:imageUrl
                }
            });
        } else {
            console.log("User already exists");
        }
       
      
     } catch (error) {
        console.log("Error while saving user ",error);
     }
}