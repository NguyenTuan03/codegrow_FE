'use client'
import { Auth } from "@/lib/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const auth = useContext(Auth)  
  useEffect(() => {
    console.log(auth?.userAuth);
    
    if (!auth || !auth.userAuth) {    
      router.replace('/login');
      return;
    }

    switch (auth.userAuth.role) {
      case "admin":
        router.replace("/admin");
        break;
      case "mentor":
        router.replace("/mentor");
        break;
      case "qaqc":
        router.replace("/qaqc");
        break;
      case "customer":
        router.replace("/customer");
        break;
      default:
        router.replace("/login");
        break;
    }
  }, [auth?.userAuth, router]);
  return <div>Loading...</div>;
}
