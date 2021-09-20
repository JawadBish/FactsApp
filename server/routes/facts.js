import express from 'express';
import {getAllFact, createFact } from '../controllers/facts.js'

const router = express.Router();


router.get('/', getAllFact);
router.post('/', createFact);

export default router;