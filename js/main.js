const currencyDate = document.getElementById("currency-date")
const btnDate = document.getElementById("btn-date")
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctx4 = document.getElementById('myChart4').getContext('2d');

const state = {
    label: "",
    labels: [],
    dataValues: []
}


async function fetchData(date){
    //console.log(date)
    labels = []
    dataValues = []

 //return fetch(`https://data.fixer.io/api/${dateToLookFor}?access_key=${key}&base=EUR&symbols=USD,GBP,MXN,CAD,ERN,BYN,CUP`).then((res) => {
    const response = await fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/confirmed`)
    //const data = await response.json()
    //console.log(data)
  //return data
     .then((response) => {
        const data = response.json()
        //console.log(data)
        return data
    }).then(data => {

        for(let i=0; i < data.length ; i++){
            labels.push(data[i].Date)
            //console.log(data[i].Cases)
            dataValues.push(data[i].Cases)
           // console.log(data[i].Date)
        }

        state.label = "Casos confirmados"
        state.labels = Object.values(labels)
        state.dataValues = Object.values(dataValues)
        console.log(Object.values(labels))
        console.log(Object.values(dataValues))
    })
}

function generateChart(dataLabel, dataLabels, dataValues){
    console.log(dataLabels)
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
function generateChartBarras(dataLabel, dataLabels, dataValues){
    console.log(dataLabels)

     var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: [        'Sunday',        'Monday',        'Tuesday',        'Wednesday',        'Thursday',        'Friday',        'Saturday'      ],
      datasets: [{
        data: [          15339,          21345,          18483,          24003,          23489,          24092,          12034        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'green',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
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
    await generateChartBarras(state.label,state.labels,state.dataValues)
}

init()