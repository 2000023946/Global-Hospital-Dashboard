import React, { useState } from 'react'
import procedures from '../data/procedures.js'
import views from '../data/views.js'


export default function Sidebar({ props, updateProps }) {
  const [selectedSection, setSelectedSection] = useState('procedures')

  return (
    <div className='flex flex-col flex-1 bg-white items-center justify-center min-h-0 overflow-auto border-r-2 relative'>
      <div className="flex h-fit  sticky top-0 z-10 w-full">
        <SideBarTopItem
          selectedSection={selectedSection}
          currentSection="procedures"
          setSelectedSection={setSelectedSection}
        />
        <SideBarTopItem
          selectedSection={selectedSection}
          currentSection="views"
          setSelectedSection={setSelectedSection}
        />
      </div>
      <div className="flex-4 space-y-3 pt-5 min-h-0">
        {(selectedSection === 'procedures' ? procedures : views).map((item, index) => (
          <SideBarItem key={index} item={item} updateProps={updateProps} action={props.selectedAction}/>
        ))}
        <div className='h-10'></div>
      </div> 
    </div>
  )
}

function SideBarTopItem({ selectedSection, currentSection, setSelectedSection }) {
  const isActive = selectedSection === currentSection;

  const bgClass = isActive ? "bg-blue-300" : "bg-blue-100";
  const hoverClass = isActive ? "hover:bg-blue-300" : "hover:bg-blue-100";

  return (
    <div
      onClick={() => setSelectedSection(currentSection)}
      className={`flex-1 select-none text-center text-lg font-medium p-3 cursor-pointer 
      transition-all duration-200 ${bgClass} ${hoverClass}`}
    >
      <div className="flex items-center justify-center">
        {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
      </div>
    </div>
  );
}


function SideBarItem({ item, updateProps, action}) {
  return (
    <div
      onClick={() => updateProps({ selectedAction: item.name })}
      className={`p-4 select-none text-m font-light rounded-lg hover:bg-blue-${action === item.name ? '200' : '100'} 
      transform transition-all cursor-pointer ${action === item.name ? 'bg-blue-200' : ''} w-full`}
    >
      {console.log(action,item.name)}
      <h3 className="font-semibold text-gray-800">{item.name}</h3>
    </div>
  )
}
