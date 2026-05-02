import React from 'react'
import "../../styles/club/Campo.css";

function Campo({id, nombre, type, placeholder, min, step = false, onChange, defaultValue}) {
  return (
    <>
        <label className='campo--label' htmlFor={id}>{nombre}: </label>
        <input className='campo--input' type={type} placeholder={placeholder} id={id} min={min} step={"any"} onChange={onChange} defaultValue={defaultValue}></input>
    </>
  )
}

export default Campo
