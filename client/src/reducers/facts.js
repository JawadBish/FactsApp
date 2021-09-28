import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_FACT } from '../constants/actionTypes'


const factReducer = (state = { isLoading: true, facts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                facts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return {
                ...state,
                facts: action.payload,

            };
        case FETCH_FACT:
            return {
                ...state,
                fact: action.payload.fact
            };

        case CREATE:
            return {
                ...state,
                facts: [...state.facts, action.payload]
            };


        case DELETE:
            return {
                ...state,
                facts: state.facts.filter((fact) => fact._id !== action.payload)
            };

        case UPDATE:
        case LIKE:
            return {
                ...state,
                facts: state.facts.map((fact) => fact._id === action.payload._id ? action.payload : fact)

            };

        default:
            return state;
    };
}

export default factReducer;
