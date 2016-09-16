require('./index.less');

import React from 'react';
import { connect } from 'react-redux'
import { changeRouter, changeLevel } from '../../redux/actions'

import config from '../../config';

class Index extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }
    render() {
        var { dispatch, level } = this.props;
        return (
            <div className="index">
                <div>
                    <label htmlFor="level">选择难度：</label>
                    <select name="level" id="level" onChange={(e)=>dispatch(changeLevel(config.level[e.target.value]))}>
                        {config.level.map((v, i)=>(
                            <option key={v.name} value={i}>{v.name}</option>
                        ))}
                    </select>
                    <span> {level.value && level.value.join('×')}</span>
                </div>
                <button onClick={()=>dispatch(changeRouter('game'))}>开始游戏</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        level: state.level
    }
}

export default connect(mapStateToProps)(Index)
