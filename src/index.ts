import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
const AppError = require('./utils/appError')
const cors = require('cors');

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
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
} )

app.use((err: typeof AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
