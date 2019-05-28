import React, { Component, MouseEvent, Props } from 'react';
import './welcome.less';
import anime from 'animejs'
import Root from '../../components/root'
import { History } from 'history';

interface P extends Props<{}> {
  history: History;
}

class Welcome extends Component<P> {
  title: React.RefObject<HTMLDivElement>
  button: React.RefObject<HTMLButtonElement>

  constructor(props: P) {
    super(props);
    this.title = React.createRef();
    this.button = React.createRef();
  }

  hangdlestart = () => {
    anime({
      targets: this.button.current,
      opacity: 0,
    })
    anime({
      targets: this.title.current,
      translateY: "6rem",
      opacity: {
        value: 0,
        easing: "linear"
      },
    }).finished.then(() => {
      console.log("跳转到登入页面/设备页面");
      this.props.history.push('/login')
    })
  }
  render() {
    return (
      <>
        <div ref={this.title} className='title'>
          <p>Welcome</p>
          <p>Smart home</p>
        </div>
        <button ref={this.button} className='start-button' onClick={this.hangdlestart}>start</button>
      </>
    )
  }
}

export default Root(Welcome);