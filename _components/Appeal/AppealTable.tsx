'use client'

import getAllAppealPersonal from "@/_service/service/getAllAppealPersonal";
import {User} from "@/_types/user";
import {useEffect, useRef, useState} from "react";
import {Appeal} from "@/_types/service/Appeal";
import getAllCategoryService from "@/_service/service/getAllCategoryService";
import {CategoryService} from "@/_types/service/CategoryService";
import getAllAppeal from "@/_service/service/getAllAppeal";
import {Status} from "@/_types/service/Status";
import getAllStatusService from "@/_service/service/getAllStatusService";
import {redirect} from "next/navigation";
import updateStatusAppeal from "@/_service/service/updateStatusAppeal";

type Props = {
  isUpdate?: boolean,
  user: User
}

export default function AppealTable(props: Props) {
  if (props.user.role.code !== "admin" && props.user.role.code !== "manager" && props.isUpdate) redirect('/appeal/personal')

  const [appeal, setAppeal] = useState<Appeal[]>()
  const [category, setCategory] = useState<CategoryService[]>()
  const [status, setStatus] = useState<Status[]>()

  useEffect(() => {
    const fetchAppealPersonal = async () => {
      const appeal = await getAllAppealPersonal(props.user)
      setAppeal(appeal)
    }

    const fetchAppeal = async () => {
      const appeal = await getAllAppeal(props.user)
      setAppeal(appeal)
    }

    const fetchCategory= async () => {
      const category = await getAllCategoryService()
      setCategory(category)
    }

    const fetchStatus= async () => {
      const status = await getAllStatusService()
      setStatus(status)
    }

    if (!category) {fetchCategory()}
    if (!appeal && !props.isUpdate) fetchAppealPersonal()
    if (!appeal && props.isUpdate) fetchAppeal()
    if (!status && props.isUpdate) fetchStatus()

  })

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
    <div className="container mx-auto">
      <h4>История {props.isUpdate ? "всех" : "ваших"} обращений: </h4>
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
              <td className="border border-slate-700 p-2">{getCategory(item.type.category_id)}</td>
              <td className="border border-slate-700 p-2">{item.type.name}</td>
              <td className="border border-slate-700 p-2">{item.message}</td>
              <td className="border border-slate-700 p-2">{
                !props.isUpdate ? item.status.name :
                <select onChange={(e) => handleUpdateStatus(item.id, Number(e.target.value))}>
                {status?.map(value => <option 
                  selected={value.name === item.status.name} 
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