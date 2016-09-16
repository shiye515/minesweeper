require('./index.less');

import React from 'react';
import { connect } from 'react-redux'
import { changeRouter, fillMap, endGame } from '../../redux/actions'

import Tile from '../Tile';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.restart = this.restart.bind(this)
        this.restart()
    }
    restart() {
        let { dispatch, level } = this.props;
        dispatch(fillMap(level.value))
        dispatch(endGame())
    }
    render() {
        let { dispatch, level, map } = this.props;
        return (
            <div className="game">
                <div>
                    <button onClick={()=>dispatch(changeRouter('index'))}>返回首页</button>
                    <button onClick={this.restart}>重新开始</button>
                </div>
                <div className="board">
                    {map.map((v, i)=>(
                        <div key={i} className="board-row">
                            {v.map((v1, i1)=>(
                                <Tile key={i1} x={i1} y={i} status={v1} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.level,
        map: state.map
    }
}

export default connect(mapStateToProps)(Game)
