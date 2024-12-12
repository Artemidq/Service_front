'use client'
import Header from "@/_components/Header";
import AppealTable from "@/_components/Appeal/AppealTable";
import {useEffect, useState} from "react";
import {User} from "@/_types/user";
import getAuthUser from "@/_service/user/getAuthUser";

export default function Appeal() {
  const [user, setUser] = useState<User>()

  useEffect(()=> {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        setUser(user)
      }
    };

    fetchUser()
  }, []);

  return (
    <main>
      <Header/>
      { user ? <AppealTable user={user} isUpdate={true}/> : null }
    </main>
  )
}