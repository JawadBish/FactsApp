import axios from 'axios';

const url = 'http://localhost:5000/facts';

export const fetchFacts = () => axios.get(url);
export const createFact = (newFact) => axios.post(url, newFact);
export const updateFact = (id, updatedFact) => axios.patch(`${url}/${id}`, updatedFact);
export const deleteFact = (id) => axios.delete(`${url}/${id}`);
