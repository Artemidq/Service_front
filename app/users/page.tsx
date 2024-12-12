'use client'
import {Role, User} from "@/_types/user";
import {useEffect, useState} from "react";
import getAuthUser from "@/_service/user/getAuthUser";
import Header from "@/_components/Header";
import getAllUsers from "@/_service/user/getAllUsers";
import getAllRole from "@/_service/service/getAllRole";
import updateRoleUser from "@/_service/user/updateRoleUser";

export default function Type() {
  const [users, setUsers] = useState<User[]>()
  const [user, setUser] = useState<User>()
  const [roles, setRoles] = useState<Role[]>()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        setUser(user)
      }
    };

    const fetchUsers= async () => {
      await fetchUser()
      if (user) {
        const users = await getAllUsers(user)
        setUsers(users.filter((item: User) => item !== user))
      }
    }

    const fetchRoles= async () => {
      await fetchUser()
      const roles = await getAllRole()
      setRoles(roles)
    }

    if (!roles && !users) {
      fetchRoles()
      fetchUsers()
    }
  })

  async function handleUpdateRoles(id: number, role_id: number) {
    if (user && await updateRoleUser(id, role_id, user)) {
      alert("Роль пользователя успешно изменена")
    }
  }

  return (
    <main>
      <Header/>
      <div className="container mx-auto">
        <h4>Все пользователи: </h4>
        <table className="border-collapse border border-slate-500 p-2...">
          <thead>
          <tr>
            <th className="border border-slate-600 p-2">Номер</th>
            <th className="border border-slate-600 p-2">Имя</th>
            <th className="border border-slate-600 p-2">E-mail</th>
            <th className="border border-slate-600 p-2">Телефон</th>
            <th className="border border-slate-600 p-2">Роль</th>
            <th className="border border-slate-600 p-2">Обновлен</th>
            <th className="border border-slate-600 p-2">Добавлен</th>
          </tr>
          </thead>
          <tbody>
          {users?.map(item =>
            <tr key={item.id}>
              <td className="border border-slate-700 p-2">{item.id}</td>
              <td className="border border-slate-700 p-2">{item.name}</td>
              <td className="border border-slate-700 p-2">{item.email}</td>
              <td className="border border-slate-700 p-2">{item.telephone}</td>
              <td className="border border-slate-700 p-2">{
                  <select onChange={(e) => handleUpdateRoles(item.id, Number(e.target.value))}>
                  {roles?.map(value => <option 
                    selected={value.name === item.role.name} 
                    key={value.id}
                    value={value.id}
                  >{value.name}</option>)}
                </select>
              }</td>
              <td className="border border-slate-700 p-2">{new Date(item.updated_at).toLocaleString()}</td>
              <td className="border border-slate-700 p-2">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </main>
  )
}