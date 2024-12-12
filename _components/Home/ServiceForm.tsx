'use client'
import {useEffect, useState} from "react";
import {User} from "@/_types/user";
import getAuthUser from "@/_service/user/getAuthUser";
import {CategoryService} from "@/_types/service/CategoryService";
import getAllCategoryService from "@/_service/service/getAllCategoryService";
import getAllTypeService from "@/_service/service/getAllTypeService";
import {TypeService} from "@/_types/service/TypeService";
import postService from "@/_service/service/postService";

export default function ServiceForm() {
  const [user, setUser] = useState<User>()
  const [category, setCategory] = useState<CategoryService[]>([]);
  const [type, setType] = useState<TypeService[]>([]);
  const [filteredType, setFilteredType] = useState<TypeService[]>([]);
  const [index, setIndex] = useState<number>(1)
  const [typeId, setTypeId] = useState<number>()
  const [message, setMessage] = useState<string>('')
  const [labelMessage, setLabelMessage] = useState<string>('')

  useEffect(()=> {
    const fetchUser = async () => {
      const token = localStorage.getItem('api_token')
      if (token) {
        const user = await getAuthUser(token)
        setUser(user)
      }
    };

    const fetchServiceCategory = async () => {
      const category = await getAllCategoryService()
      setCategory(category)
      setIndex(category[0].id)
    }

    const fetchTypeCategory = async () => {
      const type = await getAllTypeService()
      setType(type)
    }

    if (!user) fetchUser()
    fetchServiceCategory()
    fetchTypeCategory()
  }, []);

  useEffect(() => {
    console.log(index)

    if (category && type.length > 0) {
      const filtered = type.filter(t => t.category_id === index);
      console.log(filtered)
      setFilteredType(filtered);
      setTypeId(filtered[0]?.id)
    }
  }, [index]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    if (await postService(message, typeId, user)) {
      setLabelMessage("Форма успешно отправлена")
    } else setLabelMessage("Ошибка отправки")
  };

  return (
    <div className="container mx-auto">
      <h3>Форма обращения</h3>
      <form className="card services-form" onSubmit={handleSubmit}>
        {labelMessage && <p className="accent">{labelMessage}</p>}
        <div>
          <h5>Выберите категорию сервисных работ:</h5>
          <select value={index} onChange={(e) => setIndex(parseInt(e.target.value))}>
            {category?.map(item =>
              <option key={item.id} value={item.id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <h5>Выберите причину поломки:</h5>
          <select value={typeId} onChange={(e) => setTypeId(parseInt(e.target.value))}>
            {filteredType?.map(item =>
              <option key={item.id} value={item.id}>{item.name}</option>
            )}
          </select>
        </div>
        <div>
          <h5>Опишите проблему:</h5>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        </div>
        <div>
          <button type={'submit'} disabled={!user || !typeId}>Отправить обращение на обработку</button>
        </div>
      </form>
    </div>
  )
}