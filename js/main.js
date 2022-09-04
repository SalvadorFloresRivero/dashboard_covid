const currencyDate = document.getElementById("currency-date")
const btnDate = document.getElementById("btn-date")
var ctx2 = document.getElementById('myChartLines').getContext('2d');
var ctx3 = document.getElementById('myChartBar').getContext('2d');
//var ctx4 = document.getElementById('myChart4').getContext('2d');

const state = {
    label: "",
    labels: [],
    dataValues: [],
    casosConf_2020: 0,
    casosConf_2021: 0,
    casosConf_2022: 0,
    casosDef: 0,
    casosRec:0
}


async function fetchData(date){
    //console.log(date)
    let labels = []
    let dataValues = []
    let casosConf_2020 = 0
    let casosConf_2021 = 0
    let casosConf_2022 = 0
    let casosDef = 0
    let casosRec =0
    let fecha_corta = ''
    let f_anio = ''

     const response = await fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/confirmed`)
     .then((response) => {
        const data = response.json()
        //console.log(data)
        return data
    }).then(data => {

        for(let i=0; i < data.length ; i++){
            f_anio = data[i].Date.substring(0,4)

            if( f_anio == '2020' ){
                //fecha_corta = data[i].Date.substring(9,10) + data[i].Date.substring(4,7)+'-'+f_anio
                //dataValues.push(data[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosConf_2020+= data[i].Cases // Casos acumulados Confirmados para gráfica de barras
                //labels.push(fecha_corta)
            }
            if( f_anio == '2021' ){
                //fecha_corta = data[i].Date.substring(9,10) + data[i].Date.substring(4,7)+'-'+f_anio
                //dataValues.push(data[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosConf_2021+= data[i].Cases // Casos acumulados Confirmados para gráfica de barras
                //labels.push(fecha_corta)
            }
            if( f_anio == '2022' ){
                fecha_corta = data[i].Date.substring(9,10) + data[i].Date.substring(4,7)+'-'+f_anio
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
        //console.log(Object.values(labels))
        //console.log(Object.values(dataValues))
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
function generateChartBarras(dataLabel, dataValues_2020, dataValues_2021, dataValues_2022){
    //console.log(dataLabels)

    var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['2020','2021','2022'],
      datasets: [{
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
}

init()