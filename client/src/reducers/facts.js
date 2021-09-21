import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE } from '../constants/actionTypes'


const factReducer = (facts = [], action) => {
    switch (action.type) {
        case DELETE:
            return facts.filter((fact) => fact._id !== action.payload)
        case UPDATE:
        case LIKE:
            return facts.map((fact) => fact._id === action.payload._id ? action.payload : fact);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...facts, action.payload];

        default:
            return facts;
    }
}

export default factReducer;
