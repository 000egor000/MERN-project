import React from 'react'
import namePath from './namePath'

import Registaration from '../components/Registaration/Registaration'
import MainPage from '../pages/MainPage/MainPage'

const pathItems = [
  { path: namePath.DEFAULT, element: <MainPage /> },
  { path: namePath.REGISTRATION, element: <Registaration /> },
]
export { pathItems }
