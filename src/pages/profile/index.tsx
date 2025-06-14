import {useSession} from "next-auth/react";
import { useRouter} from "next/router";
import { useEffect} from "react";

export default function ProfilePage(){
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === "unauthenticated"){
            router.push("/sign-in");
        }
    }, [status, router]);

    if(status === "loading"){
        return <div className = "p-8">Duke u ngarkuar...</div>
    }

    return(
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-10">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">Profili i përdoruesit</h1>

        <p><strong>Email:</strong> {session?.user?.email}</p>
        <p><strong>ID:</strong> {session?.user?.id}</p>

        {session?.user?.isAdmin && (
          <p className="mt-4 text-green-700 font-semibold">Admin i sistemit ✅</p>
        )}

         <button
        onClick={() => router.push("/catalogue")}
        className="mt-6 bg-amber-900 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
      >
        Shko te Katalogu
      </button>
      </div>

      
    )
}