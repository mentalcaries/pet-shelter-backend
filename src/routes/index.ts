import express from 'express'
import petRouter from '../routes/pets'
import userRouter from '../routes/users'

const router = express.Router();

router.use('/pets', petRouter)
router.use('/users', userRouter)

module.exports = router;