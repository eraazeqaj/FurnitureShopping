import { getUserByEmail } from "@/api/services/products";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter} from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcryptjs";
import NextAuth from "next-auth";

const authOptions = {
     adapter: MongoDBAdapter (clientPromise as any),
     providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
             },
             async authorize (credentials){
                const user= await getUserByEmail(credentials?.email!);
                if(!user) throw new Error("Email nuk ekziston");

                const isValid = await compare(credentials!.password, user.password);
                if (!isValid) throw new Error("Fjalekalimi nuk eshte i sakte");
                if(!user._id) throw new Error("User Id mungon");

                return {
                    id: user._id.toString(),
                    email: user.email,
                    emailVerified: user.emailVerified ?? null,
                };
             },
        }),
     ],

    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt" as "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
    
    };

    export default NextAuth(authOptions);
