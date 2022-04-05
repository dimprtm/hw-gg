import { createStore } from "redux";
import spotifyReducer from "./reducers";

const store = createStore(spotifyReducer, {
    token: '',
});

export default store;