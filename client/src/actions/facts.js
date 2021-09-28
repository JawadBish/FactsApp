import * as api from '../apis';
import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_FACT } from '../constants/actionTypes'
// Action Creatores

export const getFacts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchFacts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}


export const getFact = (id) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING });

        const { data } = await api.fetchFact(id);

        dispatch({ type: FETCH_FACT, payload: { fact: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export const getFactsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.getFactsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }

}


export const createFact = (fact, history) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createFact(fact);

        dispatch({ type: CREATE, payload: data });
        // dispatch({ type: END_LOADING });
        history.push(`/facts/${data._id}`);
        history.push(`/facts/`);
    } catch (error) {
        console.log(error);
    }

}

export const updateFact = (id, fact) => async (dispatch) => {
    try {
        const { data } = await api.updateFact(id, fact);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }

}



export const deleteFact = (id) => async (dispatch) => {
    try {
        await api.deleteFact(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }

}



export const likeFact = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeFact(id);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }

}
