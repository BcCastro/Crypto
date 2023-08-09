import InputConvert from './InputConvert'
import './Convert.css'
import { FaExchangeAlt } from "react-icons/fa";
import { useState, useEffect } from 'react'


export default function Convert() {
    const [coin, setCoin] = useState([])
    const [selCoin1, setSelCoin1] = useState('btc')
    const [selCoin2, setSelCoin2] = useState('eth')
    const [mainTxt, setMainTxt] = useState(0)
    const [res, setRes] = useState(0)

    /*Función para obtener datos de la API*/
    const getData = async () => {
        /*Esta constante es una solicitud GET a la API CoinGecko*/
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

        const json = await response.json()

        /*El setCoin, actualiza el estado "coin" con los datos obtenidos*/
        setCoin(json)
    }

    /*Se usa el hook useEffect para obtener datos al cargar el componente*/
    useEffect(() => {
        getData()
    }, [])


    /*Se utiliza de nuevo el hook useEffect para realizar la comparación de monedas*/
    useEffect(() => {
        /*El let es para declarar variables "a" y "b"*/
        let a, b
        /*El coin.ForEach se utiliza sobre la lista de monedas*/
        coin.forEach(({ symbol, current_price }) => {
            if (symbol == selCoin1) {
                a = mainTxt * current_price
            } else {
                b = current_price
            }
        })

        /*A ? se utiliza para actualizar el estado "res" con el resultado de la comparación*/
        a ? setRes(a / b) : setRes(0)
    }, [mainTxt, selCoin1, selCoin2])

    return (
        <div className='contenedor'>
            <h2>Comparación de Monedas</h2>

            <div className='input-convert'>
                <InputConvert coin={coin} fun={setSelCoin1} other={selCoin2} text={setMainTxt} type={0} />

                <FaExchangeAlt className="icono" />

                <InputConvert coin={coin} sel="eth" fun={setSelCoin2} other={selCoin1} result={res} />
            </div>
        </div>
    )
}    
