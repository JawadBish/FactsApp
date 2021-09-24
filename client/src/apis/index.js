import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


export const fetchFacts = () => API.get('facts');
export const createFact = (newFact) => API.post('facts', newFact);
export const updateFact = (id, updatedFact) => API.patch(`facts/${id}`, updatedFact);
export const deleteFact = (id) => API.delete(`facts/${id}`);
export const likeFact = (id) => API.patch(`facts/${id}/likeFact`);


export const signIn = (formData) => API.post('users/signin', formData);
export const signUp = (formData) => API.post('users/signup', formData);