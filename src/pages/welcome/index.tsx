import React, { useCallback, Props } from 'react';
import './welcome.less';
import anime from 'animejs'
import withRoot from '../../components/root'
import { History } from 'history';
import { httpUser } from '../../api/http';

interface P extends Props<{}> {
  history: History;
}

let title: React.RefObject<HTMLDivElement> = React.createRef();
let button: React.RefObject<HTMLButtonElement> = React.createRef();

function Welcome(props: P) {

  const hangdlestart=useCallback(
    async () => {
      anime({
        targets: button.current,
        opacity: 0,
      })
      anime({
        targets: title.current,
        translateY: "6rem",
        opacity: {
          value: 0,
          easing: "linear"
        },
      }).finished.then(async () => {
        // console.log("跳转到登入页面/设备页面");
        let res = await httpUser.checkToken();
        if (res === false) {
          props.history.push('/login')
        } else {
          props.history.push('/devicelist')
        }
      })
    },
    []
  )

  return (
    <>
      <div ref={title} className='title'>
        <p>Welcome</p>
        <p>Smart home</p>
      </div>
      <button ref={button} className='start-button' onClick={hangdlestart}>
        start
      </button>
    </>
  )
}

export default withRoot(Welcome);