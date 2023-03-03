import express from 'express';
import { createUser } from '../controllers/users'

const router = express();

router.post('/', createUser); 

export default router;