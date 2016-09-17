import React from 'react';
import { connect } from 'react-redux'
import Index from './components/Index';
import Game from './components/Game';
import Score from './components/Score';

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }
    render() {
        var { router } = this.props;
        return (
            <div id="app">
                {router === 'index' ? <Index /> : null}
                {router === 'game' ? <Game /> : null}
                <Score />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        router: state.router
    }
}

export default connect(mapStateToProps)(App)
