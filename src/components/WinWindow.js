import React from 'react';

export default class WinWindow extends React.Component {
    render(){
        return(
            <div 
            className={this.props.winWindowClass}
            > 
            Nice Work! Try Another!
            </div>
        );
    }
  }