import express from 'express';
import { getAllFact, createFact, updateFact, deleteFact, likeFact } from '../controllers/facts.js'
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/', getAllFact);
router.post('/', auth, createFact);
router.patch('/:id', auth, updateFact);
router.delete('/:id', auth, deleteFact);
router.patch('/:id/likeFact', auth, likeFact);
export default router;