import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/Store";
import "./index.css"

//TODO: Перенести все обработчики в отдельные переменные
//TODO: Максимально разгрузить компоненты

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
