import React, { useEffect, useRef, MutableRefObject } from 'react'
import './LoadingPlaceholder.less'
import anime from 'animejs';


const prefix = 'loadingPlaceholder'

function LoadingPlaceholder(): JSX.Element {

  const loading: MutableRefObject<HTMLDivElement | null> = useRef(null);
  let box: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    let animebox = anime({
      targets: box.current,
      translateY: 130,
      loop: true,
      direction: 'alternate',
      rotateX: 180,
      update: (event) => {
        if(loading.current===null){
          return;
        }
        let time=event.currentTime/event.duration
        let text='.'
        while(time>0){
          time-=0.2
          text+='..'
        }
        loading.current.innerText=text
      }
    })
    return () => {
      animebox.pause()
    };
  }, [])

  return (
    <div className={`${prefix}`}>

      <div className={`${prefix}-title`}>Loading</div>
      <div className={`${prefix}-title`} ref={(element) => { loading.current = element }}>...</div>

      <div className={`${prefix}-box`} ref={(element) => { box.current = element }} />
    </div>
  )
}

export default LoadingPlaceholder