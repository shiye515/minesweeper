require('./index.less');

import React from 'react';
import { connect } from 'react-redux'
import { createMap, markMap, startGame } from '../../redux/actions'

const statusMap = {
    x: '',
    flag: 'f',
    question: '?',
    0: 'b',
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
    }
    mark() {
        let { dispatch, level, x, y, game, status } = this.props;
        if (game === 'waiting') {
            dispatch(startGame())
            dispatch(createMap(level, x, y))
        } else {
            dispatch(markMap(x, y))
        }
    }
    render() {
        let { dispatch, x, y, status } = this.props;
        return (
            <div className="tile" onClick={this.mark}>{statusMap[status[1]]}</div>
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
