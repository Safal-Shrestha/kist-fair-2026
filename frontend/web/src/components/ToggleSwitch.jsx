import React from 'react'

export default function ToggleSwitch({ checked, onChange, title }){
  return (
    <label className="inline-flex items-center cursor-pointer group" title={title}>
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className={`w-11 h-6 rounded-full relative transition-all duration-200 ease-in-out ${checked ? 'bg-green-500' : 'bg-gray-300'} group-hover:scale-105`}>
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
    </label>
  )
}
