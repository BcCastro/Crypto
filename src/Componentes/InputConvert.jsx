import React, { useState, useRef } from 'react'
import './Convert.css'
import { deleteDec } from '../App'

export default function InputConvert({ coin, sel = "btc", fun, other, text, type = 1, result = 0 }) {

  const selRef = useRef(null) /*La constante selRef crea una referencia para el elemento select*/
  const [selVal, setSelVal] = useState(sel) /*Las constantes selVal y setSelVal, dfinen un estado para el valor seleccionado*/

  return (
    <>
      <div className='input'>

        {(type == 0) ? <input type="number" placeholder="0" onChange={e => { text(parseInt(e.target.value)) }} /> : <input type="number" placeholder="0" value={deleteDec(result, 4)} readOnly={true} />}

        <div className='select'>
          <img src="" alt="" />

          <select value={selVal} ref={selRef} onChange={() => {
            setSelVal(selRef.current.value)
            fun(selRef.current.value)
          }}>

            {coin.map((co) => { /*Se utiliza el método map para recorrer el arreglo de monedas coin y generar opciones (option) para el elemento de selección*/
              if (co.symbol === selVal) {
                selRef.current.previousSibling.src = co.image
                return <option value={co.symbol} key={co.id}>{co.symbol}</option>
              } else if (co.symbol != other) {
                return <option value={co.symbol} key={co.id}>{co.name}</option>
              }
            })}
          </select>
        </div>
      </div>
    </>
  )
}