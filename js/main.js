import { fetchData, state } from './api.js'
import { generateChart } from './charts.js'

var ctx2 = document.getElementById('myChartLines').getContext('2d');




const init = async () => {
    let titleGraph = 'Casos de reporte COVID-19 en 2022'
    await fetchData()
    await generateChart(ctx2, state.labels, state.label, state.label3, state.dataValues,  state.dataValues3, titleGraph)
}

init()