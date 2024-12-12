'use client'
import {Login, Register} from "@/_types/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {redirect} from "next/navigation";
import {Router} from "next/router";
import Header from "@/_components/Header";

export default function Login() {
  const [error, setError] = useState("")
  const [isAuth, setValueAuth] = useState(false)
  const [formData, setFormData] = useState<Login>( {
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuth) redirect('/')
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post('http://servicerepair/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status == 200) {
        localStorage.setItem('api_token', response.data.api_token);
        setValueAuth(true)
      }
    })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <main>
      <Header/>
      <div className="h-[calc(100vh-70px)] flex justify-center items-center">
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <p className="accent">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Авторизироваться</button>
        </form>
      </div>
    </main>
  )
}