import React from 'react'
import './coinRow.css'
import { deleteDec, colorDec, numberF } from './App'

export default function coinRow({ coin, index }) {
    return (
        <tr>
            <td>{index}</td>
            <td>
                <div className='coin_image_container'>
                    <img src={coin.image} alt={coin.name} title={coin.name} />
                </div>
            </td>
            <td>{numberF.format(coin.current_price)} US$</td>
            <td className={colorDec(coin.market_cap_change_percentage_24h)}>%</td>
            <td>US$</td>
            <td>US$</td>
        </tr>
    )
}