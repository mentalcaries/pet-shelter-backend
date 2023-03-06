import express from 'express';
import petRouter from './pets';
import userRouter from './users';

const router = express.Router();

router.use('/pets', petRouter);
router.use('/users', userRouter);

module.exports = router;
