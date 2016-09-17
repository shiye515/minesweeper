require('./index.less');

import React from 'react';

import config from '../../config';

class Score extends React.Component {
    constructor(props) {
        super();
        this.state = {
            score: []
        };
    }
    componentWillMount() {
        var scoresref = window.wilddog.sync().ref('scores');
        scoresref
            .orderByChild('time')
            .limitToFirst(10)
            .on('value', (snapshot, error) => {
                if (error == null) {
                    var score = snapshot.val();
                    this.setState({
                        score: Object.keys(score).map(v => score[v])
                    })
                }
            });
    }
    render() {
        var { score } = this.state;
        return (
            <div className="score">
                <h4>排行榜</h4>
                <table>
                    <thead>
                        <tr>
                            <th>昵称</th>
                            <th>难度</th>
                            <th>时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {score.map((v,i)=>(
                            <tr key={i}>
                                <td>{v.name}</td>
                                <td>{v.level}</td>
                                <td>{v.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Score
