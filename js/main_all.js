import { fetchData, state } from './api.js'
import { generateChartBarras, generateChartPastel } from './charts.js'

var ctx3 = document.getElementById('myChartBar').getContext('2d');
var ctx4 = document.getElementById('myChartBar2').getContext('2d');
var ctx5 = document.getElementById('myChartBar3').getContext('2d');
var ctx6 = document.getElementById('myChartPastel').getContext('2d');

const init = async () => {

  let titulo1 = 'Casos confirmados por COVID-19'
  let titulo2 = 'Casos recuperados por COVID-19'
  let titulo3 = 'Casos fallecidos por COVID-19'

    await fetchData()

    let casosConf = state.casosConf_2020 + state.casosConf_2021 + state.casosConf_2022
    let casosDead = state.casosDead_2020 + state.casosDead_2021 + state.casosDead_2022
    let casosRecov = state.casosRecov_2020 + state.casosRecov_2021 + state.casosRecov_2022
    console.log('rec 2021'+state.casosRecov_2021)

    await generateChartBarras(ctx3, state.label, state.casosConf_2020, state.casosConf_2021, state.casosConf_2022, titulo1)
    await generateChartBarras(ctx4, state.label2, state.casosRecov_2020, state.casosRecov_2021, state.casosRecov_2022, titulo2)
    await generateChartBarras(ctx5, state.label3, state.casosDead_2020, state.casosDead_2021, state.casosDead_2022, titulo3)
    await generateChartPastel(ctx6, casosConf, casosRecov, casosDead)
}

init()