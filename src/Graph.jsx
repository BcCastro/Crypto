import { useEffect, useState, useRef } from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";

import {
    chart as chartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

import moment from "moment/moment";

ChartJs.register(
    Categoryscale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function Graph({ type = 1, coin = "bitcoin", currency = "usd", days = 30, colo = "#04D99D" }) {

    const charStyle = {
        border: {
            display: false
        },
        grid: {
            display: false
        },
        ticks: {
            display: false
        }
    }

    let url = `https://api.coingecko.com/api/v3/coin/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`

    let data, options

    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    return <div>Graph</div>;
}


export default Graph;