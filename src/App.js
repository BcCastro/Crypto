import { useEffect, useState } from 'react' // Hooks
// Importamos nuestra hoja de estilos
import './App.css';

// Importacion de los componentes principales de la aplicación

import Header from './Componentes/Header';
import CardPrincipal from './Componentes/CardPrincipal';
import Card from './Componentes/Card';
import Convert from './Componentes/Convert';
import TableCoins from './Componentes/TableCoins';
import Footer from './Componentes/Footer';

function App() {
  /*
    Estados: Utilizo 3 estados principales
    Estado setCoins: Aquí se guarda el valor de todas las monedas que nos entrega el consumo de la API.
    Estado setCurrency: Aquí se guarda el valor de todas las divisas que nos entrega el consumo de la API.
    Estado setSelCur: Aquí se guarda el valor de la divisa seleccionada.
  */
  const [coins, setCoins] = useState();
  const [currency, setCurrency] = useState();
  const [selCur, setSelCur] = useState("usd");

  /*
    Consumo de la API por medio del método async await y haciendo uso de Fetch
  */
  // Se crea una variable que va a contener el llamado de la API
  const getData = async () => {
    /* 
      Se adjunta la URL que generamos en la página de la API con los  valores que necesitamos mostrar en nuestros componentes. En la parte de vs_currency se cambia el valor por defecto que es USD y se le pasa el valor que va a estar almacenado en nuestro estado selCur, es decir, la divisa que tengamos seleccionada en ese momento. 
      En per_page cambia el valor 100 por 4, ya que al momento de mostrar el cambio de divisa, solo muestra las 4 primeras monedas, este valor puede variar de acuerdo a la información que requiera el usuario ver.
    */
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`
    );

    /* 
      Cuando llamamos la API el valor que nos retorna es un arreglo de objetos tipo json, este valor lo vamos a almacenar en una variable y lo vamos a leer por medio del método json()
    */
    const json = await response.json();

    /*
      La siguiente URL se genera  la API para que nos permita acceder a diferentes divisas, esta URL la almacenamos en una variable.

    */
    const response_cur = await fetch(
      `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
    );

    /*
      EL valor que nos retorna es un arreglo de tipo json, este valor lo vamos a almacenar en una variables y accedemos a él por medio del método json()
    */
   
    const cur = await response_cur.json();

    // Aqui almacena la información de todas las monedas en este estado
    setCoins(json);

    // Aqui almacena el valor de las divisas en este estado
    setCurrency(cur);
  };

  // Este estado cargara la información cuando el componente este listo
  useEffect(() => {
    getData();
  }, []);

  // Este estado cargará la información cuando seleccionemos una nueva divisa
  useEffect(() => {
    getData();
  }, [selCur]);

  /*
    Con el operador ternario se valida: Si el valor es diferente a la información de coins, es decir, si la información que nos entrega la API aun no esta lista entonces va a aparecer el texto "cargando", de lo contrario va a renderizar los componentes
  */
  return !coins ? (
    "Cargando..."
  ) : (
    <div className="App">
      <Header currencys={currency} fun={setSelCur} cur={selCur} />
      <main>
        <CardPrincipal json={coins[0]} cur={selCur} />

        <div className="cards_con">
          {coins.map(
            (
              {
                id,
                symbol,
                image,
                current_price,
                price_change_percentage_30d_in_currency,
              },
              index
            ) => {
              if (index != 0) {
                return (
                  <Card
                    key={index}
                    price={`${symbol} - ${current_price} ${selCur} `}
                    porcentaje={deleteDec(
                      2,
                      2
                    )}
                    img={image}
                    coinId={id}
                    cur={selCur}
                  />
                );
              }
            }
          )}
        </div>
      </main>
      <Convert />
      <TableCoins coins={coins} />
      <Footer />
    </div>
  );
}

export default App;

// Función para formatear los decimales
export function deleteDec(val, decimal) {
  return val.toFixed(decimal);
}

// Función para asignar la clase "green o red" de acuerdo al valor numérico
export function colorDec(num) {
  return num > 0 ? "green" : "red";
}

// Función para separar los valores en miles
export const numberF = Intl.NumberFormat("es-ES");