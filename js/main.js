var ctx2 = document.getElementById('myChartLines').getContext('2d');
var ctx3 = document.getElementById('myChartBar').getContext('2d');
var ctx4 = document.getElementById('myChartBar2').getContext('2d');
var ctx5 = document.getElementById('myChartBar3').getContext('2d');

const state = {
    label: "", // Confirmados
    label2: "", // 2 Recuperados
    label3: "", // 3 fallecidos
    labels: [],
    labels2: [],
    labels3: [],
    dataValues: [],
    dataValues2: [],
    dataValues3: [],
    casosConf_2020: 0,
    casosConf_2021: 0,
    casosConf_2022: 0,
    casosRecov_2020: 0,
    casosRecov_2021: 0,
    casosRecov_2022: 0,
    casosDead_2020: 0,
    casosDead_2021: 0,
    casosDead_2022: 0
}


async function fetchData(date){
    //console.log(date)
    let labels = []
    let dataValues = []
    let labels2 = []
    let dataValues2 = []
    let labels3 = []
    let dataValues3 = []
    let casosConf_2020 = 0
    let casosConf_2021 = 0
    let casosConf_2022 = 0
    let casosRecov_2020 = 0
    let casosRecov_2021 = 0
    let casosRecov_2022 = 0
    let casosDead_2020 = 0
    let casosDead_2021 = 0
    let casosDead_2022 = 0
    let fecha_corta = ''
    let f_anio = ''

     const response = await fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/confirmed`)
     .then((response) => {
        const data = response.json()
        return data
    }).then(data => {

        for(let i=0; i < data.length ; i++){
            f_anio = data[i].Date.substring(0,4)

            if( f_anio == '2020' ){
                casosConf_2020+= data[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2021' ){
                casosConf_2021+= data[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2022' ){
                fecha_corta = data[i].Date.substring(8,10) + data[i].Date.substring(4,7)+'-'+f_anio
                dataValues.push(data[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosConf_2022+= data[i].Cases // Casos acumulados Confirmados para gráfica de barras
                labels.push(fecha_corta)
            }
        }

        state.label = "Casos confirmados"
        state.labels = Object.values(labels)
        state.dataValues = Object.values(dataValues)
        state.casosConf_2020=casosConf_2020
        state.casosConf_2021=casosConf_2021
        state.casosConf_2022=casosConf_2022
    })
    const response2 = await fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/recovered`)
     .then((response2) => {
        const data2 = response2.json()
        console.log(data2)
        return data2
    }).then(data2 => {

        for(let i=0; i < data2.length; i++){
            f_anio = data2[i].Date.substring(0,4)

            if( f_anio == '2020' ){
                casosRecov_2020+= data2[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2021' ){
                casosRecov_2021+= data2[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2022' ){
                fecha_corta = data2[i].Date.substring(9,10) + data2[i].Date.substring(4,7)+'-'+f_anio
                dataValues2.push(data2[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosRecov_2022+= data2[i].Cases // Casos acumulados Confirmados para gráfica de barras
                labels2.push(fecha_corta)
            }
        }

        state.label2 = "Casos recuperados"
        state.labels2 = Object.values(labels2)
        state.dataValues2 = Object.values(dataValues2)
        state.casosRecov_2020=casosRecov_2020
        state.casosRecov_2021=casosRecov_2021
        state.casosRecov_2022=casosRecov_2022
    })
    const response3 = await fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/deaths`)
     .then((response3) => {
        const data3 = response3.json()
        console.log(data3)
        return data3
    }).then(data3 => {

        for(let i=0; i < data3.length; i++){
            f_anio = data3[i].Date.substring(0,4)

            if( f_anio == '2020' ){
                casosDead_2020+= data3[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2021' ){
                casosDead_2021+= data3[i].Cases // Casos acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2022' ){
                fecha_corta = data3[i].Date.substring(9,10) + data3[i].Date.substring(4,7)+'-'+f_anio
                dataValues3.push(data3[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosDead_2022+= data3[i].Cases // Casos acumulados Confirmados para gráfica de barras
                labels3.push(fecha_corta)
            }
        }

        state.label3 = "Casos de fallecidos"
        state.labels3 = Object.values(labels3)
        state.dataValues3 = Object.values(dataValues3)
        state.casosDead_2020=casosDead_2020
        state.casosDead_2021=casosDead_2021
        state.casosDead_2022=casosDead_2022
    })
}

function generateChart(dataLabel, dataLabels, dataValues){
    //console.log(dataLabels)
    let myChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [{
                label: dataLabel,
                borderColor: 'green',
                data: dataValues,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Casos de reporte COVID-19',
                fontSize: 20,
                padding: 30,
                fontColor: '#12619c'
            },
            scales: {
                xAxes: [{
                  gridLines: {
                    display: false,
                  }
                }]
              },
            legend:{
                position: 'bottom',
                labels: {
                    padding: 20,
                    boxWidth: 15,
                    fontFamily: 'system-ui',
                    fontColor: 'black'
                }
            },
            tooltips: {
                scales: {
                    xAxes: {
                        display: false
                    }
                },
                backgroundColor: '#0584f6',
                titleFontSize: 10,
                xPadding: 8,
                yPadding: 8,
                bodyFontSize: 15,
                bodySpaceing: 10,
                //mode: 'x', cuando se tenganlas 3 causas covid

            },
            elements: {
                line: {
                    borderWidth: 4,
                    fill: false,
                },
                point: {
                    radius: 6,
                    borderWidth: 4,
                    backgroundColor: 'white',
                    hoverRadius: 6,
                    hoverBorderWidth: 4,
                }
            }
        }
    });
}
// Muertes, Recuperados y Confirmados
function generateChartBarras(dataLabel2, dataValues_2020, dataValues_2021, dataValues_2022){
    //console.log(dataLabels)

    var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['2020','2021','2022'],
      datasets: [{
        label: dataLabel2,
        data: [dataValues_2020, dataValues_2021, dataValues_2022],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
        title: {
            display: true,
            text: 'Casos de reporte COVID-19',
            fontSize: 20,
            padding: 30,
            fontColor: '#12619c'
        },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  }
  );
}
// Muertes, Recuperados y Confirmados
function generateChartBarras2(dataLabel2, dataValues_2020, dataValues_2021, dataValues_2022){
    //console.log(dataLabels)

    var myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: ['2020','2021','2022'],
      datasets: [{
        label: dataLabel2,
        data: [dataValues_2020, dataValues_2021, dataValues_2022],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
        title: {
            display: true,
            text: 'Casos de reporte COVID-19',
            fontSize: 20,
            padding: 30,
            fontColor: '#12619c'
        },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  }
  );
}
// Muertes, Recuperados y Confirmados
function generateChartBarras3(dataLabel2, dataValues_2020, dataValues_2021, dataValues_2022){
    //console.log(dataLabels)

    var myChart5 = new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: ['2020','2021','2022'],
      datasets: [{
        label: dataLabel2,
        data: [dataValues_2020, dataValues_2021, dataValues_2022],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
        title: {
            display: true,
            text: 'Casos de reporte COVID-19',
            fontSize: 20,
            padding: 30,
            fontColor: '#12619c'
        },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  }
  );
}
/* const update = () => {
    myChart.destroy()
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["1"],
            datasets: [{
                label: "cambio",
                data: ["3"],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
} */

const init = async () => {
    await fetchData()
    await generateChart(state.label,state.labels,state.dataValues)
    await generateChartBarras(state.label, state.casosConf_2020, state.casosConf_2021, state.casosConf_2022)
    await generateChartBarras2(state.label2, state.casosRecov_2020, state.casosRecov_2021, state.casosRecov_2022)
    await generateChartBarras3(state.label3, state.casosDead_2020, state.casosDead_2021, state.casosDead_2022)
}

init()