import React, { useState, useContext, useEffect } from 'react'
import './MainPage.scss'
import NoData from '../../components/noData/NoData'
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
  const { userId, selStatusloader } = useContext(contextApp)

  const reset = () => {
    setText('')
  }

  const addTask = async (e) => {
    if (!text) {
      return
    }
    selStatusloader(true)
    try {
      await postRequest(`/api/todo/add`, {
        userId,
        text,
      }).then((res) => {
        reset()
        getTodo()
        selStatusloader(false)
        toast.success('Задача добавлена!')
      })
    } catch (error) {
      console.log(error)
      selStatusloader(false)
      toast.error('Что-то пошло не так!')
    }
  }
  const getTodo = (e) => {
    selStatusloader(true)
    try {
      postRequest('/api/todo/get', {
        userId,
      }).then((res) => {
        setTodoArray(res)
        selStatusloader(false)
      })
    } catch (error) {
      console.log(error)
      selStatusloader(false)
    }
  }
  useEffect(() => getTodo(), [])
  const deleteTodo = async (id) => {
    selStatusloader(true)
    try {
      await deleteRequest(`/api/todo/delete/${id}`).then((res) => {
        toast.success('Задача удалена!')
        getTodo()
        selStatusloader(false)
      })
    } catch (error) {
      console.log(error)
      selStatusloader(false)
    }
  }
  const putTodoCompleted = async (id) => {
    selStatusloader(true)
    try {
      await putRequest(`/api/todo/completed/${id}`).then((res) => {
        toast.success('Задача изменена!')
        getTodo()
        selStatusloader(false)
      })
    } catch (error) {
      console.log(error)

      selStatusloader(false)
    }
  }
  const putTodoImportant = async (id) => {
    selStatusloader(true)
    try {
      await putRequest(`/api/todo/important/${id}`).then((res) => {
        toast.success('Задача изменена!')
        getTodo()
        selStatusloader(false)
      })
    } catch (error) {
      selStatusloader(false)
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
          {todoArray.length > 0 ? (
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
            })
          ) : (
            <NoData />
          )}
        </ul>
      </div>
    </div>
  )
}

export default MainPage
