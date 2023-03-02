import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
const AppError = require('./utils/appError')
const globalErrorHandler = require('./utils/errorController')

dotenv.config();

const bodyParser = require('body-parser');

const mainRouter = require('./routes/index');

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', mainRouter);

app.all('*',(req, res, next)=> {
  console.log(req.method)
  next(new AppError(`Cannot ${req.method} to  ${req.originalUrl} on this server`, 404))
} )

app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});

