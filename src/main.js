require('./app.less');

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './redux/reducers'
import App from './App'

let state = {};
// try {
//     state = JSON.parse(window.localStorage.getItem('minesweeperData')) || {}
// } catch (e) {}
let store = createStore(reducers, state)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

window.addEventListener('beforeunload', function () {
    window.localStorage.setItem('minesweeperData', JSON.stringify(store.getState(), ['router', 'level']));
})
