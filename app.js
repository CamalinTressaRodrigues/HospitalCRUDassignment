const express = require('express'); //express framework
const app = new express();
const morgan = require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const hospitalRouter = require('./routes/CRUDoperation');


app.use(express.json());
app.use('/hospitals',hospitalRouter );

//server on port 3000
app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT}`);
})