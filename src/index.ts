import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config();

const bodyParser = require('body-parser');

const mainRouter = require('./routes/index')

const app = express();

const PORT = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', mainRouter)

app.listen(PORT, ()=>{
  console.log(`🚀 Server running on ${PORT}`)
})