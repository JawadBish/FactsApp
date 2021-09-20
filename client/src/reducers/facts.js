const factReducer =  (facts= [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...facts, action.payload];
        default:
            return facts;
    }
}

export default factReducer;
