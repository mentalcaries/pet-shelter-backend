import { NextFunction, Request, Response } from 'express';
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const pool = require('../model/index');

const getAllPets = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const results = await pool.query('SELECT * from pets');
    
    return response.status(200).json(results.rows);
  }
);

const addPet = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const {
      name,
      birthDate,
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

    const result = await pool.query(
      'INSERT INTO pets (name, "birthDate", type, gender, city, country, "shelterId", breed, photo, vaccinated, neutered, adopted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        name,
        birthDate,
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

    if (!result) {
      return next(new AppError(`Could not add pet`, 400));
    }
    return response
      .status(200)
      .json({ Message: 'Success', result: result.rows });
  }
);

const getPetsByType = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const type = request.params.petType;

    const result = await pool.query('SELECT * FROM pets WHERE type=$1', [type]);

    if (result.rows.length === 0) {
      return next(new AppError(`No results found matching ${type}`, 404));
    } else return response.status(200).json(result.rows);
  }
);

const getPetsByLocation = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const location = `${request.params.location}%`;

    const result = await pool.query('SELECT * FROM pets WHERE city ILIKE $1', [
      location,
    ]);

    if (result.rows.length === 0) {
      return next(new AppError('No Pets found for this city', 404));
    } else return response.status(200).json(result.rows);
  }
);

export { getAllPets, addPet, getPetsByType, getPetsByLocation };
