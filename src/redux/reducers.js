import { combineReducers } from 'redux'

import config from '../config';

import { CHANGE_ROUTER, CHANGE_LEVEL, FILL_MAP, CREATE_MAP, MARK_MAP, FLAG_MAP, TURN_MAP, GAME_PERIOD } from './actions'

function router(state = 'index', action) {
    switch (action.type) {
    case CHANGE_ROUTER:
        return action.router
    default:
        return state
    }
}

function level(state = config.level[0], action) {
    switch (action.type) {
    case CHANGE_LEVEL:
        return action.level
    default:
        return state
    }
}

function randomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// for (var i = 0; i < 100; i++) {
//     console.log(randomInt(0, 10))
// }

function map(state = [], action) {
    let { x, y, size, level } = action;
    switch (action.type) {
    case FILL_MAP:
        let map = [];
        if (size && size.length > 0) {
            for (let i = 0; i < size[1]; i++) {
                map[i] = [];
                for (let j = 0; j < size[0]; j++) {
                    map[i][j] = [0, 'x'];
                }
            }
        }
        return map
    case CREATE_MAP:
        // var newState = state.map((v, i) => v.map((v1, i1) => v1));
        // var newState = state;

        let { value } = level;
        let mines = [x + '-' + y];
        let mine;
        let mineArray;
        for (let i = 0; i < value[2];) {
            mineArray = [randomInt(value[0] - 1), randomInt(value[1] - 1)];
            mine = mineArray.join('-');
            if (mines.indexOf(mine) === -1) {
                mines.push(mine);
                state[mineArray[1]][mineArray[0]] = [1, 'x']
                i++;
            }
        }
        // newState[y][x][1] = newState[y][x][0]
        // console.log(newState);
        // return newState
    case MARK_MAP:
        state = state.map((v, i) => v.map((v1, i1) => v1.slice()));
        let markList = [
            [y, x]
        ];
        var firstLoop = true;
        while (true) {
            let [y, x] = markList.pop();
            let mineCount = [
                [y - 1, x - 1],
                [y - 1, x],
                [y - 1, x + 1],
                [y, x - 1],
                [y, x + 1],
                [y + 1, x - 1],
                [y + 1, x],
                [y + 1, x + 1]
            ].reduce(function (prev, cur) {
                if (state[cur[0]] && state[cur[0]][cur[1]]) {
                    return prev + state[cur[0]][cur[1]][0]
                }
                return prev
            }, 0)

            if (firstLoop || mineCount === 0) {
                state[y][x][1] = mineCount
            }
            firstLoop = false;
            if (mineCount === 0) {
                [
                    [y - 1, x],
                    [y, x + 1],
                    [y + 1, x],
                    [y, x - 1]
                ].forEach(v => {
                    if (state[v[0]] && state[v[0]][v[1]] && state[v[0]][v[1]][1] === 'x') {
                        markList.push(v)
                    }
                })
            }
            if (markList.length === 0) {
                break
            }
        }
        return state
    case FLAG_MAP:
        state = state.map((v, i) => v.map((v1, i1) => v1.slice()));
        let flagLoop = {
            x: 'flag',
            flag: 'question',
            question: 'x',
        }
        if (flagLoop[state[y][x][1]]) {
            state[y][x][1] = flagLoop[state[y][x][1]]
        }
        return state
    case TURN_MAP:
        state = state.map((v, i) => v.map((v1, i1) => {
            if (v1[0] === 1) {
                v1[1] = 'mine'
            }
            return v1.slice()
        }));
        return state
    default:
        return state
    }
}

function game(state = 'waiting', action) {
    switch (action.type) {
    case GAME_PERIOD:
        return action.period
    default:
        return state
    }
}

export default combineReducers({
    router,
    level,
    map,
    game
})

// function visibilityFilter(state = SHOW_ALL, action) {
//     switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//         return action.filter
//     default:
//         return state
//     }
// }

// function todos(state = [], action) {
//     switch (action.type) {
//     case ADD_TODO:
//         return [
//             ...state, {
//                 text: action.text,
//                 completed: false
//             }
//         ]
//     case TOGGLE_TODO:
//         return state.map((todo, index) => {
//             if (index === action.index) {
//                 return Object.assign({}, todo, {
//                     completed: !todo.completed
//                 })
//             }
//             return todo
//         })
//     default:
//         return state
//     }
// }
