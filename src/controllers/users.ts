import { prisma } from './client';
import { NextFunction, Request, Response } from 'express';

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { username, name, email, password, type, city, country } =
      request.body;
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password,
        type,
        city,
        country,
      },
    });

    if (!user) return next(new AppError('Could not register user', 400));
    else {
      return response
        .status(200)
        .json({ Message: 'Successful registration', result: user });
    }
  }
);

// edit user
// delete user


export { createUser };
