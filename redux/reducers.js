import { combineReducers } from 'redux';

import productsReducer from "./productsReducer";
import sortsReducer from "./sortsReducer";


let combinedReducer=combineReducers({
    products: productsReducer, 
    sorts: sortsReducer,
    
    
    
    // редьюсер productsReducer отвечает за раздел state под именем products
    // + другие редьюсеры
});

export default combinedReducer;
