import * as api from '../apis';

// Action Creatores

export const getFacts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchFacts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }



}


export const createFact = (fact) => async (dispatch) => {

    try {
        const { data } = await api.createFact(fact);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const updateFact = (id, fact) => async (dispatch) => {
    try {
        const { data } = await api.updateFact(id, fact);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }

}

