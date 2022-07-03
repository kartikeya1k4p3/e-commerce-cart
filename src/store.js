import { createStore } from "redux";
import rootRed from "./Redux/Reducers/main";


const store = createStore (
    rootRed
);

export default store;