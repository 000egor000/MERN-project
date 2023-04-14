import React, { useState, useEffect } from 'react'
import './NoData.scss'
import { FaRegFileExcel } from 'react-icons/fa'
const NoData = ({}) => {
  return (
    <div className="noData">
      <FaRegFileExcel />
      <p>Нет данных!</p>
    </div>
  )
}
export default NoData
