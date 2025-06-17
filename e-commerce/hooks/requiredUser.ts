// import { currentUser } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation";

// export const requiredUser = async () => {
//     const user = await currentUser();
//     if(!user) {
//         return redirect("/");
//     }
// };import { useUser } from "@clerk/nextjs";
// hooks/useRequireUser.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export const useRequireUser = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/"); // ridrejto në Home nëse s’ka user
    }
  }, [isLoaded, user, router]);

  return user;
};

