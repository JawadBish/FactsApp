import express from 'express';
import { getAllFact, createFact, updateFact, deleteFact, likeFact } from '../controllers/facts.js'

const router = express.Router();


router.get('/', getAllFact);
router.post('/', createFact);
router.patch('/:id', updateFact);
router.delete('/:id', deleteFact);
router.patch('/:id/likeFact', likeFact);
export default router;