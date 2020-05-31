import React from 'react';
//import './index.css';
import {Button} from 'react-bootstrap';

export default class Buttons extends React.Component{
    handleSelect = (evt) => {
      this.props.gridSize(evt);
    }
    render() {
          return (
              <div className="center">
                    <Button variant="warning" onClick={this.props.info}>Info</Button>{''}
                    <Button className='newSeed' variant="primary" onClick={this.props.seed} size='lg'>New Seed</Button>{''}
                    <Button variant="warning" onClick={this.props.hint}>Hint</Button>{''}

              </div>
              )
      }
  }