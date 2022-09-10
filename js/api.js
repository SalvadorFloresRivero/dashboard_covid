export const state = {
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

export async function fetchData(date){
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
                casosConf_2020= data[i].Cases // Casos YA acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2021' ){
                casosConf_2021= data[i].Cases // Casos YA acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2022' ){
                fecha_corta = data[i].Date.substring(8,10) + data[i].Date.substring(4,7)+'-'+f_anio
                dataValues.push( data[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosConf_2022= data[i].Cases // Casos YA acumulados Confirmados para gráfica de barras, solo se deja el útimo
                labels.push(fecha_corta)
            }
        }

        state.label = "Casos confirmados"
        state.labels = Object.values(labels)
        state.dataValues = Object.values(dataValues)
        state.casosConf_2020 = casosConf_2020
        state.casosConf_2021 = casosConf_2021
        state.casosConf_2022 = casosConf_2022
        //const valor = new Intl.NumberFormat().format(casosConf_2020)
        //console.log(valor)

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
                casosRecov_2020= data2[i].Cases // Casos ya acumulados Confirmados para gráfica de barras
            }
            if( f_anio == '2021' ){
                if( data2[i].Cases > 0 ){
                    casosRecov_2021= data2[i].Cases // Casos ya acumulados Confirmados para gráfica de barras
                }
            }
            if( f_anio == '2022' ){
                fecha_corta = data2[i].Date.substring(9,10) + data2[i].Date.substring(4,7)+'-'+f_anio
                dataValues2.push(data2[i].Cases) // Casos acumulados Confirmados para gráfica de lineas
                casosRecov_2022= data2[i].Cases // Casos YA acumulados Confirmados para gráfica de barras, solo se deja el útimo
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
                casosDead_2020= data3[i].Cases // Casos YA acumulados Confirmados para gráfica de barras, solo se deja el útimo
            }
            if( f_anio == '2021' ){
                casosDead_2021= data3[i].Cases // Casos YA acumulados Confirmados para gráfica de barras, solo se deja el útimo
            }
            if( f_anio == '2022' ){
                fecha_corta = data3[i].Date.substring(9,10) + data3[i].Date.substring(4,7)+'-'+f_anio
                dataValues3.push(data3[i].Cases) // Casos YA acumulados Confirmados para gráfica de lineas, solo se deja el útimo
                casosDead_2022= data3[i].Cases // Casos acumulados Confirmados para gráfica de barras
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