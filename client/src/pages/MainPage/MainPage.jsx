import React, { useState, useContext, useEffect } from 'react'
import './MainPage.scss'
import {
  FaWindowClose,
  FaRegCheckCircle,
  FaRegBell,
  FaTrashAlt,
  FaFireAlt,
} from 'react-icons/fa'
import contextApp from '../../context/contextApp'
import { toast } from 'react-toastify'
import { postRequest, deleteRequest, putRequest } from '../../base/api-request'
const MainPage = () => {
  const [text, setText] = useState('')
  const [todoArray, setTodoArray] = useState([])
  const { userId } = useContext(contextApp)

  const reset = () => {
    setText('')
  }
  console.log(todoArray)
  const addTask = async (e) => {
    if (!text) {
      return
    }
    try {
      await postRequest(`/api/todo/add`, {
        userId,
        text,
      }).then((res) => {
        reset()
        getTodo()
        toast.success('Задача добавлена!')
      })
    } catch (error) {
      console.log(error)
      toast.error('Что-то пошло не так!')
    }
  }
  const getTodo = (e) => {
    try {
      postRequest('/api/todo/get', {
        userId,
      }).then((res) => {
        setTodoArray(res)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => getTodo(), [])
  const deleteTodo = async (id) => {
    try {
      await deleteRequest(`/api/todo/delete/${id}`).then((res) => {
        toast.success('Задача удалена!')
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const putTodoCompleted = async (id) => {
    try {
      await putRequest(`/api/todo/completed/${id}`).then((res) => {
        toast.success('Задача изменена!')
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const putTodoImportant = async (id) => {
    try {
      await putRequest(`/api/todo/important/${id}`).then((res) => {
        toast.success('Задача изменена!')
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  }
  const styleLi = ({ status, important }) => {
    const classValue = ['first']
    if (status) classValue.push('status')
    if (important) classValue.push('important')
    return classValue.join(' ')
  }
  return (
    <div className="mainPage">
      <div className="content">
        <h1>Добавить задачу:</h1>
        <label>
          <span>Задача</span>
          <textarea
            value={text}
            placeholder="Например: Стать суперменом!"
            onChange={(e) => setText(e.target.value)}
          />
        </label>

        <input type="button" value="Добавить" onClick={() => addTask()} />
      </div>
      <div className="content">
        <div className="activeTask">
          <h1>Активные задачи:</h1>
          <span>{todoArray.length}</span>
        </div>

        <ul>
          {todoArray.length > 0 &&
            todoArray.map((item, i) => {
              return (
                <li key={item._id}>
                  <div className={styleLi(item)}>
                    <span>{i + 1 + '.'}</span>
                    <span>{item.text}</span>
                  </div>
                  <div className="second">
                    <span onClick={() => putTodoCompleted(item._id)}>
                      {item.status ? <FaWindowClose /> : <FaRegCheckCircle />}
                    </span>
                    <span onClick={() => putTodoImportant(item._id)}>
                      {item.important ? <FaFireAlt /> : <FaRegBell />}
                    </span>
                    <span onClick={() => deleteTodo(item._id)}>
                      <FaTrashAlt />
                    </span>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default MainPage
