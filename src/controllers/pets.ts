import { Request, Response } from 'express';

const pool = require('../db');

const getAllPets = async (request: Request, response: Response) => {
  try {
    const results = await pool.query('SELECT * from pet');
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
      'INSERT INTO pet (name, age, type, gender, city, country, shelterId, breed, photo, vaccinated, neutered, adopted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
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
    return response.status(200).json({Message: 'Success'});
  } catch (err: any) {
    console.error(err);
    response.status(400).json({ error: err.name });
  }
};

export { getAllPets, addPet };
