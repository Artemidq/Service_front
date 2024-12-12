'use client'
import {User} from "@/_types/user";
import {useEffect, useState} from "react";
import getAllCategoryService from "@/_service/service/getAllCategoryService";
import {CategoryService} from "@/_types/service/CategoryService";
import getAuthUser from "@/_service/user/getAuthUser";
import Header from "@/_components/Header";
import getAllTypeService from "@/_service/service/getAllTypeService";
import {TypeService} from "@/_types/service/TypeService";
import {Modal} from "@/_components/Modal";
import addTypeService from "@/_service/service/addTypeService";
import destroyTypeService from "@/_service/service/destroyTypeService";
import updateTypeService from "@/_service/service/updateTypeService";

export default function Type() {
  const [type, setType] = useState<TypeService[]>()
  const [category, setCategory] = useState<CategoryService[]>()
  const [user, setUser] = useState<User>()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [idCategory, setIdCategory] = useState<number>()
  const [name, setName] = useState<string>("")
  const [id, setId] = useState<number>()
  const [isModal, setIsModal] = useState<boolean>(false)


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        setUser(user)
      }
    };

    if (!user) fetchUser()
    if (!type) fetchType()
    if (!category) fetchCategory()
  })

  const fetchType= async () => {
    const type = await getAllTypeService()
    setType(type)
  }

  const fetchCategory= async () => {
    const category = await getAllCategoryService()
    setCategory(category)
  }

  function getCategory(id: number) {
    const categoryItem = category?.find(item => item.id === id);
    return categoryItem ? categoryItem.name : null;
  }

  async function handleUpdateType(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (id && idCategory && user && await updateTypeService(id, name, idCategory, user)) {
      alert("Тип поломки успешно обновлен")
      await fetchType()
    }
  }

  async function handleAddType(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (user && idCategory && await addTypeService(name, idCategory, user)) {
      alert("Тип поломки успешно добавлен")
      await fetchType()
    }
  }

  async function handleDestroyType(id: number){
    if (user && await destroyTypeService(id, user)) {
      alert("Вы успешно удалили категорию")
      await fetchType()
    }
  }

  function handleAddModel() {
    setName("")
    setIdCategory(1)
    setIsUpdate(false)
    setIsModal(true)
  }

  function handleUpdateModel(item: TypeService) {
    setId(item.id)
    setName(item.name)
    setIdCategory(item.category_id)
    setIsUpdate(true)
    setIsModal(true)
  }

  return (
    <main>
      <Header/>
      <div className="container mx-auto">
        <h4>Все типы поломок: </h4>
        <button onClick={() => handleAddModel()} className="my-3">
          Добавить категорию
        </button>
        <table className="border-collapse border border-slate-500 p-2...">
          <thead>
          <tr>
            <th className="border border-slate-600 p-2">Номер</th>
            <th className="border border-slate-600 p-2">Тип</th>
            <th className="border border-slate-600 p-2">Категория</th>
            <th className="border border-slate-600 p-2">Функции</th>
            <th className="border border-slate-600 p-2">Обновлен</th>
            <th className="border border-slate-600 p-2">Добавлен</th>
          </tr>
          </thead>
          <tbody>
          {type?.map(item =>
            <tr key={item.id}>
              <td className="border border-slate-700 p-2">{item.id}</td>
              <td className="border border-slate-700 p-2">{item.name}</td>
              <td className="border border-slate-700 p-2">{getCategory(item.category_id)}</td>
              <td className="border border-slate-700 p-2 flex">
                <button onClick={() => handleUpdateModel(item)}>Изменить</button>
                <button
                  onClick={async () => handleDestroyType(item.id)}
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
                isUpdate ? handleUpdateType(event) : handleAddType(event)}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            required
            placeholder="Наименование"
          />
         <select className="mb-3" onChange={(e) => setIdCategory(Number(e.target.value))}>
  {category?.map(value =>
    <option
      selected={value.name === getCategory(id || 1)}
      key={value.id}
      value={value.id}
    >{value.name}</option>)}
</select>
          <button type="submit">{isUpdate ? "Обновить" : "Добавить"}</button>
        </form>
      </Modal>
    </main>
  )
}