import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';

export default function ConfigureStore(initialState) {
    return createStore (
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
};