import { getUser } from "@/api/services/User";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter} from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcryptjs";

const authOptions = {
     adapter: MongoDBAdapter (clientPromise),
     providers:[
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
             },
             async authorize (credentials){
                const user= await getUser(credentials?.email!);
                if(!user) throw new Error("Email nuk ekziston");

                const isValid = await compare(credentials!.password, user.password);
                if (!isValid) throw new Error("Fjalekalimi nuk eshte i sakte");

                return {
                    id: user._id.toString(),
                    email: user.email,
                    emailVerified: user.emailVerified ?? null,
                };
             },
        }),
     ],
    };
}