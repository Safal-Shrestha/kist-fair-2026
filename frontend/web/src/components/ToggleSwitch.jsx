import React, { useState, useEffect } from 'react'

export default function ToggleSwitch({ checked, onChange, title, offClass = 'bg-gray-300' }){
  // localChecked allows the switch to animate immediately on click
  const [localChecked, setLocalChecked] = useState(!!checked)

  // keep local state in sync when parent updates checked
  useEffect(()=>{ setLocalChecked(!!checked) }, [checked])

  function handleChange(e){
    const next = e?.target ? !!e.target.checked : !localChecked
    // update local for immediate animation
    setLocalChecked(next)
    // bubble to parent (parent may perform optimistic updates as well)
    try{ onChange && onChange(next) }catch(err){ console.debug('ToggleSwitch onChange error', err) }
  }

  return (
    <label className="inline-flex items-center cursor-pointer group" title={title}>
      <input
        type="checkbox"
        checked={localChecked}
        onChange={handleChange}
        className="sr-only peer"
      />
      <div className={`w-11 h-6 rounded-full relative transform transition-colors duration-200 ease-in-out ${localChecked ? 'bg-green-500' : offClass} group-hover:scale-105 group-hover:shadow-md active:scale-95 will-change-transform`}>
        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${localChecked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    </label>
  )
}
