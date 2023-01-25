import express from 'express'
import petRouter from '../routes/pets'

const router = express.Router();

router.use('/pets', petRouter)

module.exports = router;