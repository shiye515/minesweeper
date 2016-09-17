require('./index.less');

import React from 'react';
import { connect } from 'react-redux'
import { createMap, markMap, flagMap, turnMap, startGame } from '../../redux/actions'

const statusMap = {
    x: '',
    flag: '',
    question: '?',
    mine: '×',
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8
}

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.mark = this.mark.bind(this)
        this.flag = this.flag.bind(this)
    }
    mark() {
        let { dispatch, level, x, y, game, status } = this.props;
        if (typeof status[1] === 'number') {
            return;
        }
        if (game === 'waiting') {
            dispatch(startGame())
            dispatch(createMap(level, x, y))
        } else if (status[0] === 1) {
            dispatch(turnMap())
        } else {
            dispatch(markMap(x, y))
        }
    }
    flag(e) {
        e.preventDefault();
        let { dispatch, level, x, y, game, status } = this.props;
        if (typeof status[1] === 'number') {
            return;
        }
        dispatch(flagMap(x, y))
    }
    render() {
        let { dispatch, x, y, status } = this.props;
        return (
            <div
                className={'tile status-' + status[1]}
                onClick={this.mark}
                onContextMenu={this.flag}
            >
                {statusMap[status[1]]}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.level,
        game: state.game
    }
}

export default connect(mapStateToProps)(Tile)
