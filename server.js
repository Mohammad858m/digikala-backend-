const express = require('express');
const cors = require('cors');
const cDB= require('./config/db');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/userrouter');
const productRouter = require('./routes/productrouter');

cDB();

const PORT = process.env.PORT || 3000;
const Host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))



app.use('/api/',userRouter);
app.use('/api/', productRouter);


app.listen(PORT , Host , () =>{
    console.log(`server is running on ${Host}:${PORT}`)
})



 