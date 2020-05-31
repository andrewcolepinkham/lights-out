import React from "react";
import {Button} from 'react-bootstrap';

export default class InfoWidow extends React.Component {

  render(){
  
    if(this.props.visible){

      switch(this.props.pageNum){
        default :
          return(
            <div className='info-backdrop'>
              <div className='info'>
                <h4 className={'infoPageNumber'}>{this.props.pageNum+1}/4</h4>
                <h1 className={'infoTitle'}>Welcome to Lights Out!</h1>
                <h2 className={'infoDesc'}>
                  <span>This is a fun puzzle game I built using React. </span>
                </h2>
                <h3 className={'infoPara'}>
                  <span>The game is based on a interesting linear algebra algorithm I wrote Click "next" to learn more. </span>
                </h3>
                <div className={'image'}>
                  <img className={'image'} src={"images/matrix.png"} width="350" height="350" ></img>
                </div>
                <div className={'infoBtns'}>
                  <Button className={'infoBtnClose'} variant="warning" onClick={this.props.closeWindow}>Close</Button>{''}
                  <Button className={'float-right'} variant="warning" onClick={this.props.nextPage}>Next</Button>{''}
                </div>
              </div>
            </div>
          );
        case 1:
          return(
            <div className='info-backdrop'>
              <div className='info'>
                <h4 className={'infoPageNumber'}>{this.props.pageNum+1}/4</h4>
                <h1 className={'infoTitle'}>How to Play</h1>
                <h2 className={'infoDesc'}>
                  <span>Click on the light boxes and try to turn them all off. When you click on a light, it will toggle the neighboring lights, so think carefully! </span>
                </h2>
                <h3 className={'infoPara'}>
                  <span>If you need help, click the "hint" button to unlock the correct next move. </span>
                </h3>
                <div className={'image'}>
                <img className={'hintgif'} src={"images/hint.gif"} width="350" height="350" ></img>
                  {/* <img className={'howToPlayImages'} src={"grid1.png"} width="200" height="200" ></img>
                  <img className={'howToPlayImages'} src={"hint.png"} width="150" height="100" ></img>
                  <img className={'howToPlayImages'} src={"grid2.png"} width="200" height="200" ></img> */}
                </div>
                <div className={'infoBtns'}>
                  <Button className={'infoBtnClose'} variant="warning" onClick={this.props.closeWindow}>Close</Button>{''}
                  <Button className={'float-right'} variant="warning" onClick={this.props.nextPage}>Next</Button>{''}
                  <Button className={'float-right'} variant="warning" onClick={this.props.backPage}>Back</Button>{''}
                </div>
              </div>
            </div>
          );
          case 2:
            return(
              <div className='info-backdrop'>
                <div className='info'>
                  <h4 className={'infoPageNumber'}>{this.props.pageNum+1}/4</h4>
                  <h1 className={'infoTitle'}>Behind the Algorithm</h1>
                  <h2 className={'infoDesc'}>
                    <span>I designed and implemented the algorithm to solve this puzzle game from strach originally in java and then migrated it into this react application. </span>
                  </h2>
                  <h3 className={'infoPara'}>
                    <span>The algorithm utalizes a complex matrix reduction technique called gaussian row reduction. My binary implementation will always return the correct set of moves. See it in action by clicking on the "hint" button. </span>
                  </h3>
                  <div className={'image'}>
                    <img className={'image'} src={"images/code.png"} width="350" height="350" ></img>
                  </div>
                  <div className={'infoBtns'}>
                    <Button className={'infoBtnClose'} variant="warning" onClick={this.props.closeWindow}>Close</Button>{''}
                    <Button className={'float-right'} variant="warning" onClick={this.props.nextPage}>Next</Button>{''}
                    <Button className={'float-right'} variant="warning" onClick={this.props.backPage}>Back</Button>{''}
                  </div>
                </div>
              </div>
            );
        case 3:
          return(
            <div className='info-backdrop'>
              <div className='info'>
              <h4 className={'infoPageNumber'}>{this.props.pageNum+1}/4</h4>
                <h1 className={'infoTitle'}>Check Out the Code</h1>
                <h2 className={'infoDesc'}>
                  <span>If you like this game, be sure to check out some of the other projects that I have built. </span>
                </h2>
                <h3 className={'infoPara'}>
          <span>To find my source code please check out {<a href="#" class="cta" onClick={this.props.goToGit}>my github</a>} page. </span>
                </h3>
                <div className={'image'}>
                  <img className={'image'} src={"images/githubImage.png"} width="350" height="350" ></img>
                </div>
                <div className={'infoBtns'}>
                  <Button className={'infoBtnClose'} variant="warning" onClick={this.props.closeWindow}>Close</Button>{''}
                  <Button className={'float-right'} variant="warning" onClick={this.props.closeWindow}>Finish</Button>{''}
                  <Button className={'float-right'} variant="warning" onClick={this.props.backPage}>Back</Button>{''}
                </div>
              </div>
            </div>
          );
      }
      
    } else {
      return null;
    }
    
  }

}
