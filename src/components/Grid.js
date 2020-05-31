import React from 'react';
//import './index.css';
import Box from './Box';


export default class Grid extends React.Component {
    render(){
  
      const width = (this.props.cols * 149);
      var rowsArr = []
  
      var boxClass = '';
      for (var i = 0; i < this.props.rows; i++){
        for (var j = 0; j < this.props.cols; j++){
          let boxId = i + '_' + j;
  
          boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
          console.log('this.props.boxHintIdx: ' + this.props.boxHintIdx)
          if(i===0) { //first row
            if(this.props.boxHintIdx===j) { //highlight this as hint
              boxClass = boxClass + ' hint';
            }
          } else if(i===1) { //second row
            var boxNum = this.props.boxHintIdx - 3;
            if(boxNum===j) { //highlight this as hint
              boxClass = boxClass + ' hint';
            }
          } else { //third row
            var boxNum = this.props.boxHintIdx - 6;
            if(boxNum===j) { //highlight this as hint
              boxClass = boxClass + ' hint';
            }
          } 
          
          rowsArr.push(
            <Box
              boxClass={boxClass}
              key={boxId}
              boxId={boxId}
              row={i}
              col={j}
              selectBox={this.props.selectBox}

            />
          )
        }
      }
    
      
      return(
        <div className='grid' style={{width: width}}>
          {rowsArr}
        </div>
      );
    }
  }