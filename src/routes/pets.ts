import express from 'express';
import { getAllPets, addPet } from '../controllers/pets';

const router = express();

router.get('/', getAllPets);

router.post('/', addPet);

export default router;
