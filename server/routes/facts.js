import express from 'express';
import {getAllFact, createFact , updateFact } from '../controllers/facts.js'

const router = express.Router();


router.get('/', getAllFact);
router.post('/', createFact);
router.patch('/:id', updateFact);

export default router;