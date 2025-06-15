import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "@/components/Shared/Button"; // adjust path as needed

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8">Duke u ngarkuar...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold text-amber-900 mb-4">Profili i përdoruesit</h1>

      <p className="text-amber-900"><strong>Email:</strong> {session?.user?.email}</p>
      <p className="text-amber-900"><strong>ID:</strong> {session?.user?.id}</p>

      {session?.user?.isAdmin && (
        <p className="mt-4 text-green-700 font-semibold">Admin i sistemit ✅</p>
      )}

      <div className="flex flex-col space-y-4 mt-6">
        <Button
          text="Shko te Katalogu"
          variant="primary"
          onClick={() => router.push("/catalogue")}
        />
        <Button
          text="Shiko Shportën"
          variant="secondary"
          onClick={() => router.push("/cart")}
        />
      </div>
    </div>
  );
}
