import './Card.css'
import { colorDep } from './App'


export default
    function Card({ price, porcentaje, img, coinid, cur })
    : Element {
    return (
        <div className="Card">

            <img src="img" alt="" />

            <div className="con-main">

                <div className="con-tittle">
                    <h2 className={'price ${colorDec(porcentaje)}'}>-{price} </h2>
                    <h4 className={'porcentaje ${colorDec(porcentaje)'} >% </h4>
                </div>
                {/* Grafico*/}

            </div>
        </div >

    )

}

export default Card;