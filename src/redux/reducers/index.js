import peopleReducer from "./peopleReducer";
import { combineReducers } from "redux";

const allreducers = combineReducers({
    people: peopleReducer,
});

export default allreducers;
