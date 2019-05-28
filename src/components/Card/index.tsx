import React, { Props, RefObject } from "react";
import "./card.less"
import anime from "animejs";

interface P extends Props<{}>{
  handleOnClick?:React.MouseEventHandler<HTMLDivElement>;
}

const prefix = 'card';
const contentCenter = `${prefix}-content-center`;

class Card extends React.PureComponent<P> {
  card:RefObject<HTMLDivElement>;

  constructor(props:P){
    super(props);
    this.card=React.createRef();
  }

  handleAction=(event:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    anime({
      targets:this.card.current,
      scale:2,
      opacity:{
        value:0,
        easing:'linear'
      },
      duration:800,
    }).finished.then(()=>{
      if(this.props.handleOnClick){
        this.props.handleOnClick(event);
      }
    })
  }

  render() {
    return (
      <div ref={this.card} className={`${prefix}-wrap`} onClick={this.handleAction}>
        <div className={`${prefix}-left`}>
          <div className={`${prefix}-left-up ${contentCenter}`}>title</div>
          <div className={`${prefix}-left-down ${contentCenter}`}>title</div>
        </div>
        <div className={`${prefix}-right`}>
          <div className={`${prefix}-right-up ${contentCenter}`}>title</div>
          <div className={`${prefix}-right-down ${contentCenter}`}>title</div>
        </div>
      </div>
    )
  }
}

export default Card;