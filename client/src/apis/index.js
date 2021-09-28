import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchFact = (id) => API.get(`/facts/${id}`);
export const fetchFacts = (page) => API.get(`facts?page=${page}`);
export const getFactsBySearch = (searchQuery) => API.get(`facts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createFact = (newFact) => API.post('facts', newFact);
export const updateFact = (id, updatedFact) => API.patch(`facts/${id}`, updatedFact);
export const deleteFact = (id) => API.delete(`facts/${id}`);
export const likeFact = (id) => API.patch(`facts/${id}/likeFact`);


export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);