'use client'

import {User} from "@/_types/user";
import {useEffect, useState} from "react";
import {Appeal} from "@/_types/service/Appeal";
import getAllCategoryService from "@/_service/service/getAllCategoryService";
import {CategoryService} from "@/_types/service/CategoryService";
import getAllAppeal from "@/_service/service/getAllAppeal";
import {Status} from "@/_types/service/Status";
import getAllStatusService from "@/_service/service/getAllStatusService";
import {redirect} from "next/navigation";
import updateStatusAppeal from "@/_service/service/updateStatusAppeal";
import getAllAppealBySearch from "@/_service/service/getAllAppealBySearch";
import {useDebounce} from "@/_hook/useDebounce";

type Props = {
  isUpdate?: boolean,
  user: User
}

export default function AppealTable(props: Props) {
  const {user, isUpdate} = props
  if (user.role.code !== "admin" && user.role.code !== "manager" && isUpdate) redirect('/appeal/personal')

  const [appeal, setAppeal] = useState<Appeal[]>()
  const [category, setCategory] = useState<CategoryService[]>()
  const [status, setStatus] = useState<Status[]>()
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appeal, category, status] = await Promise.all([
          getAllAppeal(props.user),
          getAllCategoryService(),
          getAllStatusService(),
        ]);

        setAppeal(appeal);
        setCategory(category);
        setStatus(status);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    void fetchData();
  }, [])

  useEffect(() => {
    const fetchAppealPersonal = async () => {
      const appeal = await getAllAppealBySearch({user, search: searchDebounce, ...(isUpdate && {type: 'all'})})
      setAppeal(appeal)
    }

    void fetchAppealPersonal()
  }, [searchDebounce])

  function getCategory(id: number) {
    const categoryItem = category?.find(item => item.id === id);
    return categoryItem ? categoryItem.name : null;
  }

  async function handleUpdateStatus(id: number, status_id: number) {
    if (await updateStatusAppeal(id, status_id, props.user)) {
      alert("Статус успешно изменен")
    }
  }

  return (
      <div className="container mx-auto flex pt-4 flex-col gap-3">
        <input
            type="email"
            name="email"
            placeholder="Поиск: "
            value={search}
            onChange={handleInputChange}
            required
        />
<h4>История {isUpdate ? "всех" : "ваших"} обращений: </h4>
        <table className="border-collapse border border-slate-500 p-2...">
          <thead>
          <tr>
            <th className="border border-slate-600 p-2">Номер обращения</th>
            <th className="border border-slate-600 p-2">Категория</th>
            <th className="border border-slate-600 p-2">Тип поломки</th>
            <th className="border border-slate-600 p-2">Текст обращения</th>
            <th className="border border-slate-600 p-2">Статус</th>
            <th className="border border-slate-600 p-2">Обновлен</th>
            <th className="border border-slate-600 p-2">Добавлен</th>
          </tr>
          </thead>
          <tbody>
          {appeal?.map(item =>
              <tr key={item.id}>
                <td className="border border-slate-700 p-2">{item.id}</td>
                <td className="border border-slate-700 p-2">{getCategory(item.type?.category_id)}</td>
                <td className="border border-slate-700 p-2">{item.type?.name}</td>
                <td className="border border-slate-700 p-2">{item.message}</td>
                <td className="border border-slate-700 p-2">{
                  !props.isUpdate ? item.status?.name :
                      <select
                          onChange={(e) => handleUpdateStatus(item.id, Number(e.target.value))}>
                        {status?.map(value => <option
                            selected={value.name === item.status?.name}
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
  )
}
