import express from 'express';
import {getAllFact, createFact , updatePost } from '../controllers/facts.js'

const router = express.Router();


router.get('/', getAllFact);
router.post('/', createFact);
router.patch('/:id', updatePost);

export default router;