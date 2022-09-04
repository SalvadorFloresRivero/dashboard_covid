/* const apiPoblacion = 'https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001,1002000002,1002000003,1002000011,1002000012/es/0700/true/BISE/2.0/eb89a296-ce4b-0c73-7123-c79bd42ca705?type=json';

const leerAppiFoto = async () => {

     fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(panCrudo => console.log(panCrudo))
    .then(panListo => console.log(panListo) )
    .catch(err => (
        (console.log(err))
    ))

     try {
        const api = await fetch(apiPoblacion);
        //const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        console.log("Oli"+api)
        const data = await api.json();
        //console.log(data[129].url);
        console.log(data.Series);
        //const apiImage = 'https://via.placeholder.com/600/92c952'
        //document.getElementById('apiImage').src = data[129].url;

    } catch (error) {
        console.log("Holi Error")
        //document.getElementById('apiImage').src = 'https://static.vecteezy.com/system/resources/previews/003/393/235/origin'
    }
}
leerAppiFoto() */

/* const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')


app.use(cors())


//const apiPoblacion = 'https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001,1002000002,1002000003,1002000011,1002000012/es/0700/true/BISE/2.0/eb89a296-ce4b-0c73-7123-c79bd42ca705?type=json';
fetch('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001,1002000002,1002000003,1002000011,1002000012/es/0700/true/BISE/2.0/eb89a296-ce4b-0c73-7123-c79bd42ca705?type=json')
  .then(response => response.json())
  .then(json => console.log(json))

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) */

/* const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')

app.use(cors())

 app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */
 
//const key = "30def6fe443530fb27395a0e260193cf"

//fetch('https://jsonplaceholder.typicode.com/todos/1')
fetch(`https://api.covid19api.com/total/dayone/country/mexico/status/confirmed`)
.then(response => response.json())
.then(json => console.log(json))
.catch(err => (
    (console.log(err))
))

/* async function getData() {
    const response = await fetch('https://api.covid19api.com/all')
    // const response = await fetch('https://api.covid19api.com/total/dayone/country/mexico/status/confirmed')
    const data = await response.json()
    return data
  } */