import { Routes, Route } from 'react-router-dom'

import { pathItems } from './pathItems'
import React from 'react'

function RoutesItem() {
  return (
    <Routes>
      {pathItems.map(({ element, path }) => (
        <Route key={element} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default RoutesItem
