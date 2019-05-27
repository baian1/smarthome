import React, { Component, MouseEvent } from 'react';
import './welcome.less';
import anime from 'animejs'

class Welcome extends Component {
  hangdlestart = (event:MouseEvent) => {
    anime({
      targets:event.target,
      opacity: 0,
    })
    let title=document.querySelector('.title');
    anime({
      targets:title,
      translateY:"6rem", 
    }).finished.then(()=>{
      console.log("跳转到登入页面/设备页面")
    })
  }
  render() {
    return (
      <div className='wrap'>
        <div className='title'>
          <p>Welcome</p>
          <p>Smart home</p>
        </div>
        <button className='start' onClick={this.hangdlestart}>start</button>
      </div>
    )
  }
}

export { Welcome };