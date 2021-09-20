import express from 'express';
import { getAllFact, createFact, updateFact, deleteFact } from '../controllers/facts.js'

const router = express.Router();


router.get('/', getAllFact);
router.post('/', createFact);
router.patch('/:id', updateFact);
router.delete('/:id', deleteFact);
export default router;