import { NextFunction, Request, Response } from 'express';
import { prisma } from './client';
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllPets = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const results = await prisma.pet.findMany();
    if (!results) {
      return next(new AppError('No Pets found', 404));
    }
    return response.status(200).json(results);
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
      ownerId,
      breed,
      photo,
      vaccinated,
      neutered,
      adopted,
    } = request.body;

    const result = await prisma.pet.create({
      data: {
        name,
        birthDate,
        type,
        gender,
        city,
        country,
        ownerId,
        breed,
        photo,
        vaccinated,
        neutered,
        adopted,
      },
    });

    if (!result) {
      return next(new AppError(`Could not add pet`, 400));
    }
    return response.status(200).json({ Message: 'Success', result: result });
  }
);

const getPetsByType = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const petType = request.params.petType;

    const result = await prisma.pet.findMany({
      where: { type: { equals: petType, mode: 'insensitive' } },
    });

    if (result.length === 0) {
      return next(new AppError(`No results found matching ${petType}`, 404));
    } else return response.status(200).json(result);
  }
);

const getPetsByLocation = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const petLocation = `${request.params.location}%`;

    const result = await prisma.pet.findMany({
      where: { city: { startsWith: petLocation, mode: 'insensitive' } },
    });
    if (result.length === 0) {
      return next(new AppError('No Pets found for this city', 404));
    } else return response.status(200).json(result);
  }
);

export { getAllPets, addPet, getPetsByType, getPetsByLocation };
