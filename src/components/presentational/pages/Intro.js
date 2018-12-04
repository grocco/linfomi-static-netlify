import React, { Component } from 'react';

export default class Intro extends Component {

    renderLeft() {
        return <div>left</div>
    }

    renderRight() {
        return <div>Right</div>
        
    }

    render() {
        if ( this.props.side === 'left') {
            return this.renderLeft();
        }
        return this.renderRight();
    }

}