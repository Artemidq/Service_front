'use client'
import {useEffect, useState} from "react";
import {User} from "@/_types/user";
import getAuthUser from "@/_service/user/getAuthUser";
import {Modal} from "@/_components/Modal";
import RegisterOrUpdate from "@/_components/RegisterOrUpdate";
import {Router} from "next/router";
import Header from "@/_components/Header";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState<User>()
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <main >
      <Header/>
      <div className="h-[calc(100vh-70px)] flex justify-center items-center">
        <div className="auth-form">
          <h6>Добро пожаловать, {user?.name}!</h6>
          <div className="my-3">
            <p>Ваш E-mail: {user?.email}</p>
            <p>Ваш телефон: {user?.telephone}</p>
          </div>
          <button className="mb-3" onClick={() => setIsModalOpen(true)}>Изменить данные</button>
          <Link href={'/appeal/personal'}>Просмотреть историю заказов</Link>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <RegisterOrUpdate isUpdate={true} user={user}/>
        </Modal>
      </div>
    </main>
  )
}