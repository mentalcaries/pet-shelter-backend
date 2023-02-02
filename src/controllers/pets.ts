import { NextFunction, Request, Response } from 'express';
const AppError = require('../utils/appError');

const pool = require('../db');

const getAllPets = async (request: Request, response: Response) => {
  try {
    const results = await pool.query('SELECT * from pets');
    return response.status(200).json(results.rows);
  } catch (err: any) {
    console.error(err);
    response.status(400).json({ error: err.name });
  }
};

const addPet = async (request: Request, response: Response) => {
  const {
    name,
    age,
    type,
    gender,
    city,
    country,
    shelterId,
    breed,
    photo,
    vaccinated,
    neutered,
    adopted,
  } = request.body;

  try {
    const result = await pool.query(
      'INSERT INTO pets (name, age, type, gender, city, country, shelterId, breed, photo, vaccinated, neutered, adopted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        name,
        age,
        type,
        gender,
        city,
        country,
        shelterId,
        breed,
        photo,
        vaccinated,
        neutered,
        adopted,
      ]
    );
    return response
      .status(200)
      .json({ Message: 'Success', result: result.rows });
  } catch (err: any) {
    console.error(err);
    response.status(400).json({ error: err.name });
  }
};

const getPetsByType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const type = request.params.petType;
  try {
    const result = await pool.query('SELECT * FROM pets WHERE type=$1', [type]);

    if (result.rows.length === 0) {
      throw new AppError('No Pets found', 404);
    } else return response.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};

const getPetsByLocation = async (request: Request, response: Response) => {
  const location = `${request.params.location}%`;
  try {
    const result = await pool.query('SELECT * FROM pets WHERE city ILIKE $1', [
      location,
    ]);

    if (result.rows.length < 1) throw new Error('No pets found');

    return response.status(200).json(result.rows);
  } catch (error: any) {
    return response.status(404).json({ error: 'Nothing found in this city' });
  }
};

export { getAllPets, addPet, getPetsByType, getPetsByLocation };
