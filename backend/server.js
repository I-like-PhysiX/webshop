const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const fs = require('fs');
let rawdata = fs.readFileSync('database.json');
let adatok = JSON.parse(rawdata);
app.use(express.static('static'))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept'
              )
    next()
                             }
      )
app.get('/', (req, res) => res.send(adatok))
app.listen(3000, () => console.log('Back-end szerver elérhető a http://localhost:3000 webcímen.'));
