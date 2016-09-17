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
        let allMarked = true;
        let markedNum = map.reduce((prev, cur) => {
            return prev + cur.reduce((prev, cur) => {
                if (cur[0] === 0 && typeof cur[1] !== 'number') {
                    allMarked = false
                }
                return prev + (cur[1] === 'flag' ? 1 : 0)
            }, 0)
        }, 0)
        let left = level.value[2] - markedNum;
        if (left === 0 && allMarked) {
            setTimeout(function () {
                var name = window.prompt('扫雷成功，请输入您的昵称：');
                var scoresref = window.wilddog.sync().ref('scores');
                scoresref.push({
                    name: name || '佚名',
                    level: level.name,
                    time: 666
                })
            }, 0)
        }
        return (
            <div className="game">
                <div className="game-status">
                    <button onClick={()=>dispatch(changeRouter('index'))}>返回首页</button>
                    <button onClick={this.restart}>重新开始</button>
                    <label htmlFor="mineleft"> 剩余：</label>
                    <input type="text" name="mineleft" readOnly="readonly" value={left}/>
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
