

import React, { useEffect, useState } from 'react'
import procedures from '../data/procedures'
import serverAPI from '../data/serverAPI'
export default function ProcedureContent({ props }) {

  const [params, setParams] = useState([])
  const [formData, setFormData] = useState({})
  const [errorData, setErrorData] = useState({})

  useEffect(() => {
    async function load() {
      console.log('Selected Action changed to:', props.selectedAction);

      let params = getInputParams(props.selectedAction);
      if (!params) params = [];

      setParams(params);

      const orm = getOrmParams(props.selectedAction);
      setFormData(orm);
      setErrorData(orm);
    }

    load();
  }, [props.selectedAction]);

  function updateFormData(key, value) {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  async function submitProcedureData() {
    await submitProcedure(props.selectedAction, formData)
  }

  return (
    <div className='flex-col w-[50%] h-[90%] justify-front bg-white p-5 rounded-2xl'>
      {params.map((paramName, index) =>{
      return (
          <InputItem name={paramName} key={index} updateFormData={updateFormData} error={errorData[paramName]}/>
      )
      })}
      <div className='bg-blue-100 p-4 w-70 rounded-lg flex justify-center font-bold cursor-pointer 
      hover:bg-blue-300 transition-all duration-200 active:bg-black active:text-blue-300'
        onClick={submitProcedureData}
      >
        Make Procedure
      </div>
    </div>

  )
}

async function submitProcedure(viewName, data) {
  try {
    const procedureEndPoint = serverAPI() + `/procedures/${viewName}`;
    console.log(procedureEndPoint);

    const resp = await fetch(procedureEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const responseData = await resp.json();
    console.log("Procedure result:", responseData);

    return responseData;

  } catch (err) {
    console.error("Fetch error:", err);
  }
}


function InputItem({name, error, updateFormData}) {
  return (
    <div className='flex-col font-bold'>
      <div className='m-2 ml-0'>{name}</div>
      <input type='text' className='border-2 border-blue-50 w-90 h-10 text-lg pl-2 rounded-b-sm'
        onChange={(e) => updateFormData(name, e.target.value)}
      />
     <div className='text-red-500 mb-2'>{error}</div>
    </div>
  )
}

function getInputParams(name) {
  const proc = procedures.find(p => p.name === name);
  return proc ? proc.input_params : null;
}

function getOrmParams(name) {
  const proc = procedures.find(p => p.name === name);
  if (!proc) return null;

  const ormObj = {};
  proc.input_params.forEach(param => {
    ormObj[param] = "";   // empty default
  });

  return ormObj;
}