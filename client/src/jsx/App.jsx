import React from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import MainContent from './MainContent.jsx'
import { useState } from 'react'
export default function App() {

  const[props, setProps] = useState({
    'selectedAction': '',
  })

  const updateProps = (newProps) => {
    setProps(prev => ({ ...prev, ...newProps }));
  }


  return (
    <div className="flex h-screen w-screen ">
      <Sidebar props={props} updateProps={updateProps} />
      <MainContent props={props} updateProps={updateProps} />
    </div>
  )
}
