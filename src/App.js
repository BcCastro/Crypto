import { useEffect, useState } from "react"; // hooks
import './App.css';
import Header from './Header'
import CardPrincipal from './CardPrincipal';
import Card from './Card'
import Convert from './convert'
import TableCoins from './TableCoins'
import Footer from './Footer'

function App(): "Cargando..." | Element {
  const [coins, setcoins] = useState()
  const [currency, setCurrency] = useState()
  const [selCur, setSelCur] = useState('usd')

  //consumo de la API

  const getData = async (): Promise<void> => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C2C24h%2C2C7d%2C2C30d%2C2C90d%2C2C1y');

    const json = await response.json()

    const response_cur = await fetch(
      'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
    )

    const cur = await response_cur.json()

    setcoins(json)
    setCurrency()
  }
  useEffect((): void => {
    getData()
  }, [])

  useEffect((): void => {
    getData()
  }, [selCur])

  return !coins ? (
    "Cargando..."
  ) : (
    <div className="App">
      <Header currencys={currency} fun={setSelCur} cur={selCur} />
      <main>
        <CardPrincipal json={coins[0]} cur={selCur} />

        <div className="cards-con">
          {coins.map(({ id, Symbol, image, current_price,
            price_change_percentaje_30d_in_currency, }, index): Element |
            undefined => {
            if (index != 0) {
              return <card key={index} price={`${Symbol} - ${current_price}
                                ${selCur}`} porcentaje={deleteDec
                  (price_change_percentaje_30d_in_currency, 2)} img={image}
                coinId={id} cur={selCur} />
            }

          })
          }
        </div>
      </main>
      <Convert />
      <TableCoins coins={coins} />
      <Footer />
    </div>
  );
}

export default App;

export function deleteDec(val, decimal): any {
  return val.toFixed(decimal);
}

export function colorDec(num): "green" | "red" {
  return num > 0 ? "green" : "red";
}

export const numberF = Intl.NumberFormat("es-Es");