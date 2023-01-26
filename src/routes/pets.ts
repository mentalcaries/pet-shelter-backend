import express from 'express';
import { getAllPets, addPet, getPetsByType, getPetsByLocation } from '../controllers/pets';

const router = express();

router.get('/', getAllPets);

router.post('/', addPet);

router.get('/:petType', getPetsByType)

router.get('/city/:location', getPetsByLocation)


export default router;
