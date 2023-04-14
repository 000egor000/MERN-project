import React, { useState, useContext } from 'react'
import './Registaration.scss'
import { postRequest } from '../../base/api-request'
import contextApp from '../../context/contextApp'

import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { toast } from 'react-toastify'
const Registaration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [eye, setEye] = useState(false)
  const [clickView, setClickView] = useState(false)

  const { login, selStatusloader } = useContext(contextApp)
  const reset = () => {
    setEmail('')
    setPassword('')
    setClickView(false)
  }
  const registarationHadler = async (e) => {
    e.preventDefault()
    selStatusloader(true)
    try {
      await postRequest(`/api/auth/${clickView ? 'registaration' : 'login'}`, {
        email,
        password,
      }).then((res) => {
        if (clickView) {
          reset()
          toast.success('Регистрация проша успешно!')
        }
        login(res.token, res.userId, res.email)
        toast.success('Авторизация проша успешно!')
        selStatusloader(false)
        window.location.reload()
      })
    } catch (error) {
      console.log(error)
      selStatusloader(false)
      toast.error('Что-то пошло не так!')
    }
  }
  const valueInput = clickView ? 'Уже есть аккаунт?' : 'Нет аккаунта?'

  return (
    <div className="registaration">
      <h2>{clickView ? 'Регистрация' : 'Авторизация'}</h2>
      <form onSubmit={registarationHadler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="eyeHelp">
          <label>
            <input
              type={eye ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setEye((res) => !res)}>
              {eye ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </label>
        </div>

        <div className="groupInput">
          <input type="submit" />

          <input
            type="button"
            onClick={() => setClickView(!clickView)}
            value={valueInput}
          />
        </div>
      </form>
    </div>
  )
}

export default Registaration
