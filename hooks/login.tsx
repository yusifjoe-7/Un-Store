'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const useCheckIfLogIn = () => {
  const router = useRouter();

  useEffect(() => {
    const local = localStorage.getItem("login");

    if (!local) {
      router.push("/login");
    }
  }, [router]);
};
type prop = {
  name: string;
  email: string;
  password: string;
};


//-----------


const API =
  "https://69fe01f98c70b15fa3ca1479.mockapi.io/api/v1/users";

const checkEmail = async (email: string) => {
  const res = await fetch(`${API}?email=${email}`);
  const data = await res.json();
  return data;
};

export const signup = async ({
  name,
  email,
  password,
}: prop) => {
  try {
    const users = await checkEmail(email);
console.log(2)
   
    if (users && users[0].id) {
      console.log(users, users[0].id)
      return;
    }

    // create user 
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:name,
        email:email,
        password:password,
      }),
    });
    console.log(3)
    const data = await res.json();
    localStorage.setItem('login', data)
    

    return "done";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

//--------

type user ={
  id:string;
  name:string;
  email:string;
  password:string;
}

export const login =async (email: string, password:string)=>{
const res = await fetch(`${API}?email=${email}`);
  const data:user[] = await res.json();
 const foundUser = data.find(
  (user) => user.password === password
);
console.log('res: ')
console.log(res)
return foundUser || null
}