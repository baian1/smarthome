import React, { Props } from 'react';
import './loading.less';

const prefix = 'loading';

const loadingicon = <svg viewBox="0 0 1024 1024" version="1.1" p-id="1139" width="100%" height="100%"><defs><style type="text/css"></style></defs><path d="M96 512c0-19.33 15.67-35 35-35s35 15.67 35 35c0 191.09 154.91 346 346 346s346-154.91 346-346-154.91-346-346-346c-19.33 0-35-15.67-35-35s15.67-35 35-35c229.75 0 416 186.25 416 416S741.75 928 512 928 96 741.75 96 512z" fill="#dbdbdb" p-id="1140"></path></svg>

interface P extends Props<{}> {
  animating: boolean;
}

class Loading extends React.Component<P> {
  public constructor(props: P) {
    super(props);
  }

  public render() {
    return (
      <div className={`${prefix}-wrap ${this.props.animating ? '' : prefix + '-hiddle'}`}>
        <div className={`${prefix}-box`}>
          <div className={`${prefix}-loading`}>{loadingicon}</div>
          <div className={`${prefix}-text`}>Loading...</div>
        </div>
      </div>
    )
  }

}

export default React.memo(Loading);