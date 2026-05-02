import React from 'react'
import '../../styles/carta/ExplicacionMenu.css'

function ExplicacionMenu({explicacion}) {
  return (
    <aside className='menu--explicacion'>
      <p>{explicacion}</p>
    </aside>
  )
}

export default ExplicacionMenu
