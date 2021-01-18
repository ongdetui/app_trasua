import { createStore } from 'redux';
import allReducer from './nodeApp';

const store = createStore(allReducer);

export default store;