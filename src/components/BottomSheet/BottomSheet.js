import React, { Component } from "react";
import {Paper, Button} from '@material-ui/core';
import { Motion, spring } from "react-motion";
import styles from "./style.js";

class BottomSheet extends Component {
  state = {
    opacity: 0,
    translate: 100,
    display: "hidden"
  };

  componentWillMount() {
    if (this.props.startHidden === false) {
      this.setState({
        opacity: 0.5,
        translate: 0,
        display: "visible"
      });
    }
  }

  animate = () => {
    this.setState(
      {
        opacity: this.state.opacity === 0.5 ? 0 : 0.5,
        translate: this.state.opacity === 0 ? 0 : 100
      },
      () => {
        if (this.state.opacity === 0) {
          setTimeout(() => {
            this.setState({
              display: "hidden"
            });
          }, 200);
        } else {
          this.setState({
            display: "visible"
          });
        }
      }
    );
  };

  render() {
    return (
      <div>
        {React.cloneElement(this.props.buttonElement, {
          onClick: this.animate
        })}
        <Motion
          style={{
            opacity: spring(this.state.opacity),
            translate: spring(this.state.translate)
          }}>

          {({ opacity, translate }) => (
            <div
              style={Object.assign({}, styles.container, {
                visibility: this.state.display
              })}
              onClick={this.animate}
            >
              <div
                style={Object.assign({}, styles.backgroundContainer, {
                  opacity: opacity
                })}
              />

              <Paper style={Object.assign({},{ zIndex: 2, margin : 5,color:"Black"},{transform: `translateY(${translate}%)`})}>
                <div style={{display:"flex", width:"100%"}}>
                    <div style={{display:"flex" , justifyContent:"flex-start", flex:1 , marginLeft:10}}>
                        <h2>Comments</h2>
                    </div>
                    <div style={{display:"flex" , justifyContent:"flex-end", flex:1, marginRight:10}}>
                        <Button style={{margin:5, fontSize:24}}>▼</Button>
                    </div>
                </div>
              </Paper>

            <ul
                style={Object.assign({}, styles.list, {
                transform: `translateY(${translate}%)`
                })}>
                {this.props.items}
            </ul>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default BottomSheet;
