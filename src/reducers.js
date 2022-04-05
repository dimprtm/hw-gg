const spotifyReducer = (state, action) => {
    switch(action.type) {
        case "storeToken":
            return{
                token: action.payload
            };
        
            default:
                return state;
    }
};

export default spotifyReducer;