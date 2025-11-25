import React, { useEffect, useState } from 'react'
import procedures from '../data/procedures'
import views from '../data/views'
import ProcedureContent from './ProcedureContent'
import ViewContent from './ViewContent'
export default function MainContent({ props, updateProps }) {

  const [operation, setOperation] = useState('')

  useEffect(() => {

  }, [props.selectedAction]);

  return (
    <div className="flex-4 flex-col flex min-h-0 p-10">
      <div className='p-5 text-center text-3xl flex-1 '>
        {props.selectedAction} 
      </div>
      <div className='flex-6 bg-white flex items-center justify-center min-h-0 overflow-auto'>
        {isProcedure(props.selectedAction) && !isView(props.selectedAction) && <ProcedureContent props={props}/>}
        {!isProcedure(props.selectedAction) && isView(props.selectedAction) && <ViewContent props={props}/>}
      </div>
    </div>
  )
}


function isProcedure(name) {
  return procedures.some(proc => proc.name === name);
}
function isView(name) {
  return views.some(v => v.name === name);
}
