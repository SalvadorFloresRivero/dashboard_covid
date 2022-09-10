
export function generateChartBarras(ctx, dataLabel2, dataValues_2020, dataValues_2021, dataValues_2022, title){

    var myChart3 = new Chart(ctx, {
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
            text: title,
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

export function generateChartPastel(ctx6, casosConf, casosRecov, casosDead){

    let tota_casos = casosConf + casosRecov + casosDead
    let porc_conf = ( parseInt(casosConf) * 100) / tota_casos
    let porc_reco = (parseInt(casosRecov) * 100) / tota_casos
    let porc_dead = (parseInt(casosDead) * 100) / tota_casos
    porc_conf = Math.round(porc_conf)
    porc_reco = Math.round(porc_reco)
    porc_dead = Math.round(porc_dead)

    let colores = ['green', 'orange', 'red']

    var myChart6 = new Chart(ctx6, {
    type: 'doughnut',
    data: {
      labels: ['Confirmados','Recuperados','Fallecidos'],
      datasets: [{
        data: [porc_conf, porc_reco, porc_dead],
        backgroundColor: Object.values(colores),
      }]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
    }
  }
  );
}

// ctx2: Contexto del canvas, dataLabels: etiquetas del eje x (fechas), Label: etiqueta de linea Casos confirmados,
// label2: etiqueta de linea Casos de fallecidos, dataValues: valores confirmados y dataValues2 valores de fallecidos
export function generateChart(ctx2, dataLabels, label,  label2, dataValues, dataValues2,titleGraph){

  let myChart = new Chart(ctx2, {
      type: 'line',
      data: {
          labels: dataLabels,
          datasets: [{
              label: label,
              borderColor: 'green',
              data: dataValues,
          },
          {
            label: label2,
            borderColor: 'red',
            data: dataValues2,
          }
        ]
      },
      options: {
          title: {
              display: true,
              text: titleGraph,
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
                  fontColor: 'black',
                  fontSize: 15,
              }
          },
          tooltips: {
              scales: {
                  xAxes: {
                      display: false
                  }
              },
              backgroundColor: '#0584f6',
              titleFontSize: 20,
              xPadding: 20,
              yPadding: 20,
              bodyFontSize: 15,
              bodySpaceing: 10,
              mode: 'x',

          },
          elements: {
              line: {
                  borderWidth: 1,
                  fill: false,
              },
              point: {
                  radius: 4,
                  borderWidth: 2,
                  backgroundColor: 'white',
                  hoverRadius: 6,
                  hoverBorderWidth: 4,
              }
          }
      }
  });
}