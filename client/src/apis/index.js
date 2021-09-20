import axios from 'axios';

const url = 'http://localhost:5000/facts';

export const fetchFacts = () => axios.get(url);
export const createFact = (newFact) => axios.post(url, newFact);
