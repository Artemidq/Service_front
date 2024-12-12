'use client'
import getAllAppealPersonal from "@/_service/service/getAllAppealPersonal";
import {User} from "@/_types/user";
import {useEffect, useState} from "react";
import {Appeal} from "@/_types/service/Appeal";
import getAllCategoryService from "@/_service/service/getAllCategoryService";
import {CategoryService} from "@/_types/service/CategoryService";
import getAllAppeal from "@/_service/service/getAllAppeal";
import getAuthUser from "@/_service/user/getAuthUser";
import Header from "@/_components/Header";
import {Modal} from "@/_components/Modal";
import addCategoryService from "@/_service/service/addCategoryService";
import destroyCategoryService from "@/_service/service/destroyCategoryService";
import updateCategoryService from "@/_service/service/updateCategoryService";
import {redirect} from "next/navigation";

export default function Category() {
  const [category, setCategory] = useState<CategoryService[]>()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [id, setId] = useState<number>()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        setUser(user)
      }
    };

    if (!user) fetchUser()
    if (!category) fetchCategory()
  })

  const fetchCategory= async () => {
    const category = await getAllCategoryService()
    setCategory(category)
  }

  async function handleAddCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (user && await addCategoryService(name, user)) {
      alert("Категория успешно добавлена")
      await fetchCategory()
    }
  }

  async function handleUpdateCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (id && user && await updateCategoryService(id, name, user)) {
      alert("Категория успешно обновлена")
      await fetchCategory()
    }
  }

  async function handleDestroyCategory(id: number){
    if (user && await destroyCategoryService(id, user)) {
      alert("Вы успешно удалили категорию")
      await fetchCategory()
    }
  }

  function handleAddModel() {
    setName("")
    setIsUpdate(false)
    setIsModal(true)
  }

  function handleUpdateModel(item: CategoryService) {
    setName(item.name)
    setId(item.id)
    setIsUpdate(true)
    setIsModal(true)
  }

  return (
    <main>
      <Header/>
      <div className="container mx-auto">
        <h4>Все категории: </h4>
        <button onClick={() => handleAddModel()} className="my-3">
          Добавить категорию
        </button>
        <table className="border-collapse border border-slate-500 p-2...">
          <thead>
          <tr>
            <th className="border border-slate-600 p-2">Номер</th>
            <th className="border border-slate-600 p-2">Категория</th>
            <th className="border border-slate-600 p-2">Функции</th>
            <th className="border border-slate-600 p-2">Обновлен</th>
            <th className="border border-slate-600 p-2">Добавлен</th>
          </tr>
          </thead>
          <tbody>
          {category?.map(item =>
            <tr key={item.id}>
              <td className="border border-slate-700 p-2">{item.id}</td>
              <td className="border border-slate-700 p-2">{item.name}</td>
              <td className="border border-slate-700 p-2 flex">
                <button onClick={() => handleUpdateModel(item)}>Изменить</button>
                <button
                  onClick={async () => handleDestroyCategory(item.id)}
                >Удалить</button>
              </td>
              <td className="border border-slate-700 p-2">{new Date(item.updated_at).toLocaleString()}</td>
              <td className="border border-slate-700 p-2">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModal} onClose={async () => setIsModal(false)}>
        <form className="auth-form"
              onSubmit={(event) =>
                isUpdate ? handleUpdateCategory(event) : handleAddCategory(event)}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
            placeholder="Наименование"
          />
          <button type="submit">{isUpdate ? "Обновить" : "Добавить"}</button>
        </form>
      </Modal>
    </main>
  )
}