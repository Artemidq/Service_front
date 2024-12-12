'use client'
import {Register} from "@/_types/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {redirect} from "next/navigation";
import {User} from "@/_types/user";

type Props = {
  isUpdate: boolean
  user?: User
}

export default function RegisterOrUpdate(props: Props) {
  const [error, setError] = useState("")
  const [isReg, setValueReg] = useState("")
  const [formData, setFormData] = useState<Register>( {
    name: props.user?.name || '',
    email: props.user?.email || '',
    telephone: props.user?.telephone || '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    switch (isReg) {
      case "register": {
        redirect('/login')
        break;
      }
      case "update": {
        redirect('/profile')
        break;
      }
    }
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post(('http://servicerepair/api/' +
        (props.isUpdate ? 'user/update' : 'auth/register')
      ),
      formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.user?.api_token
        }
      }).then(response => {
      if (response.status == 201) {
        setValueReg("register")
      }
      else if (response.status == 200) {
        setValueReg("update")
      }
    })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <main className="h-[calc(100vh-70px)] flex justify-center items-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p className="accent">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleInputChange}
          required={true}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="telephone"
          placeholder="Телефон"
          value={formData.telephone}
          onChange={handleInputChange}
          required/>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Повторите пароль"
          value={formData.password_confirmation}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{props.isUpdate ? 'Обновить данные' : 'Зарегистрироваться'}</button>
      </form>
    </main>
  )
}