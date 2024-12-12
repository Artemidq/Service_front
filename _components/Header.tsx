'use client'
import Link from "next/link";
import {useEffect, useState} from "react";
import {User} from "@/_types/user";
import getAuthUser from "@/_service/user/getAuthUser";

export default function Header() {
  const [user, setUser] = useState<User>()
  const [loader, setLoader] = useState(true)

  useEffect(()=> {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        if (user) {
          setUser(user)
        }
      }

      setLoader(false)
    };
    fetchUser()
  }, []);

  function logout() {
    localStorage.removeItem('api_token')
    setUser(undefined)
    setLoader(false)
  }

  return (
    <header className="bg-[rgba(0,0,0,.4)]">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href={'/'}>
          <h5 className="accent">ServiceRepair</h5>
        </Link>
        {
          loader ? null :
            user?.role.code === "admin" ? (
              <nav>
                <div>
                  <Link href={'/users'}>Все пользователи</Link>
                  <Link href={'/appeal'}>Все заявки</Link>
                  <Link href={'/category'}>Все категории</Link>
                  <Link href={'/type'}>Все типы поломок</Link>
                </div>
                </nav>
            ) : null
        }

        {
          loader ? null :
            user?.role.code === "manager" ? (
              <nav>
                <div>
                  <Link href={'/appeal'}>Все заявки</Link>
                </div>
              </nav>
            ) : null
        }

        {
          loader ? null :
            <nav>
              {user ? (
                <div>
                  <Link href={'/profile'}>Профиль</Link>
                  <Link onClick={logout} href={'/login'}>Выйти</Link>
                </div>
              ) : (
                <div>
                  <Link href={'/login'}>Авторизация</Link>
                  <Link href={'/register'}>Регистрация</Link>
                </div>
              )}
            </nav>
        }
      </div>
    </header>
  )
}