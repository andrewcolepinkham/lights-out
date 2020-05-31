import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Buttons from './components/Buttons';
import Grid from './components/Grid';
import WinWindow from './components/WinWindow';
import InfoWindow from './components/InfoWindow';
import {gaussianSolver} from './components/GaussianSolver'


export default class Main extends React.Component{
  constructor(){
    super();
    this.rows = 3;
    this.cols = 3;
    this.state = {
      moves: 0,
      gridFull: (Array(this.rows).fill().map(() => Array(this.cols).fill(false))),
      winWindowClass: 'winOff',
      boxHintIdx: null,
      hasWon: false,
      infoVisible: true,
      infoPageNum: 0
    }
  }


  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    if(row===0 && col===0){ //upper left corner
      gridCopy[row][col+1] = !gridCopy[row][col+1];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
    } else if(row===0 && col===2){ //upper right corner
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
    } else if(row===2 && col===0){ //bottom left corner
      gridCopy[row-1][col] = !gridCopy[row-1][col];
      gridCopy[row][col+1] = !gridCopy[row][col+1];
    } else if(row===2 && col===2){ //bottom right corner
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row-1][col] = !gridCopy[row-1][col];
    } else if(row===0 && col===1){ //middle top
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
      gridCopy[row][col+1] = !gridCopy[row][col+1];
    } else if(row===2 && col===1){ //middle bottom
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row-1][col] = !gridCopy[row-1][col];
      gridCopy[row][col+1] = !gridCopy[row][col+1];
    } else if(row===1 && col===0){ //middle left
      gridCopy[row][col+1] = !gridCopy[row][col+1];
      gridCopy[row-1][col] = !gridCopy[row-1][col];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
    } else if(row===1 && col===2){ //middle left
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row-1][col] = !gridCopy[row-1][col];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
    } else {
      gridCopy[row][col+1] = !gridCopy[row][col+1];
      gridCopy[row][col-1] = !gridCopy[row][col-1];
      gridCopy[row-1][col] = !gridCopy[row-1][col];
      gridCopy[row+1][col] = !gridCopy[row+1][col];
    }
    gridCopy[row][col] = !gridCopy[row][col];
    
    var hasWonTemp=true;
    for(var i = 0; i < gridCopy.length; i++){
      for(var j = 0; j < gridCopy.length; j++){
        if(gridCopy[i][j]){
          hasWonTemp = false;
        }
      }
    }
    var numMoves = this.state.moves;
    if(hasWonTemp){
      this.setState({
        moves: numMoves+1,
        hasWon: true,
        gridFull: gridCopy,
        boxHintIdx: null
      })
      var str = '';
      if(this.state.winWindowClass === 'winOn')
        str = 'winOff'
      else 
        str = 'winOn'
      this.setState({
        winWindowClass: str
      })
      setTimeout(() => { this.seed(); }, 3000);
    } else {
      var numMoves = this.state.moves;
      this.setState({
      gridFull: gridCopy,
      moves: numMoves+1,
      boxHintIdx: null
    })
    }

    
  }

  seed = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    var empty = true;
    while(empty) { 
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          if (Math.floor(Math.random()*2) === 1) {
            grid[i][j] = true;
          }
        }
      }
      for(let i = 0; i<this.rows; i++){
        for(let j = 0; j<this.cols; j++){
          if(grid[i][j]===true)
            empty = false;
        }
      }
    }
    this.setState({
      gridFull: grid,
      boxHintIdx: null,
      moves: 0
    })
    this.state.moves = 0;
  }

  hint = () => {
    var booleanMatrix = [];
    for(var i = 0; i < this.state.gridFull.length; i++){
      var row = [];
      for(var j = 0; j < this.state.gridFull.length; j++){
        row.push(this.state.gridFull[i][j])
      }
      booleanMatrix.push(row);
      row = []
    }
    console.log(gaussianSolver(booleanMatrix))
    var moveList = gaussianSolver(booleanMatrix)
    var move;
    for(var i = 0; i < moveList.length; i++){
      if(moveList[i]===1){
        move = i;
        break;
      }
    }
    console.log(move)
    this.setState({
      boxHintIdx: move
    })
    console.log(this.state.boxHintIdx)
  }
  
  //toggle info window
  info = () => {
    var bool;
    this.state.infoVisible? bool=false: bool=true
    this.setState({
      infoVisible: bool
    })
    if(!this.state.isVisible){
      this.setState({
        infoPageNum: 0
      })
    }

  }

  nextPage = () => {
    var page = this.state.infoPageNum
    page++;
    this.setState({
      infoPageNum: page
    })
  }
  backPage = () => {
    var page = this.state.infoPageNum
    page--;
    this.setState({
      infoPageNum: page
    })
  }
  
  goToGit = () => {
    window.open("https://github.com/andrewcolepinkham/lights-out")
  }

  componentDidMount() {
    this.seed();
  }

  render(){

    return(
      <div>
        <h1>Lights Out</h1>
        <Buttons
          seed={this.seed}
          hint={this.hint}
          solve={this.solve}
          info={this.info}
          gridSize={this.gridSize}
        />
        <Grid 
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
          boxHintIdx={this.state.boxHintIdx}
        />
        <h2>Moves: {this.state.moves}</h2>
        <WinWindow
          winWindowClass={this.state.winWindowClass}
          hasWon={this.state.hasWon}
        />
        <InfoWindow
        visible ={this.state.infoVisible}
        closeWindow={this.info}
        pageNum={this.state.infoPageNum}
        nextPage={this.nextPage}
        backPage={this.backPage}
        goToGit={this.goToGit}
        />
      </div>

    );
  }
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);



