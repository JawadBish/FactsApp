import * as api from '../apis';
import { CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes'
// Action Creatores

export const getFacts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFacts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }



}


export const createFact = (fact) => async (dispatch) => {

    try {
        const { data } = await api.createFact(fact);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const updateFact = (id, fact) => async (dispatch) => {
    try {
        const { data } = await api.updateFact(id, fact);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }

}



export const deleteFact = (id) => async (dispatch) => {
    try {
        await api.deleteFact(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }

}



export const likeFact = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeFact(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }

}
