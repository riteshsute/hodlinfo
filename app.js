const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


const hodlinfoRoute = require('./Route/hodlinfoRoute') 
const sequelize = require('./util/database')

app.use('/api', hodlinfoRoute);

sequelize
  // .sync({ force: true }) 
  .sync() 
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.log(err));
