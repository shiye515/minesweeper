/*
 * action types
 */

export const CHANGE_ROUTER = 'CHANGE_ROUTER'
export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const FILL_MAP = 'FILL_MAP'
export const CREATE_MAP = 'CREATE_MAP'
export const MARK_MAP = 'MARK_MAP'
export const GAME_PERIOD = 'GAME_PERIOD'

export function changeRouter(router) {
    return { type: CHANGE_ROUTER, router }
}
export function changeLevel(level) {
    return { type: CHANGE_LEVEL, level }
}
export function fillMap(size) {
    return { type: FILL_MAP, size }
}

export function createMap(level, x, y) {
    return { type: CREATE_MAP, level, x, y }
}
export function markMap(x, y) {
    return { type: MARK_MAP, x, y }
}

export function startGame() {
    return { type: GAME_PERIOD, period: 'doing' }
}

export function endGame() {
    return { type: GAME_PERIOD, period: 'waiting' }
}

// export const ADD_TODO = 'ADD_TODO'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
/*
 * other constants
 */

// export const VisibilityFilters = {
//     SHOW_ALL: 'SHOW_ALL',
//     SHOW_COMPLETED: 'SHOW_COMPLETED',
//     SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */

// export function addTodo(text) {
//     return { type: ADD_TODO, text }
// }

// export function toggleTodo(index) {
//     return { type: TOGGLE_TODO, index }
// }

// export function setVisibilityFilter(filter) {
//     return { type: SET_VISIBILITY_FILTER, filter }
// }
