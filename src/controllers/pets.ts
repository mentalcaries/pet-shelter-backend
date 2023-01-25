import { Request, Response } from "express";

const pool  = require('../db')

const getPets = (request: Request, response: Response) => {
  pool.query('SELECT * FROM pet;')
  .then((results) => response.status(200).json(results.rows))
  .catch(err => console.log(err))
};

module.exports = { getPets };
