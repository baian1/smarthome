import React, { Component, Props } from 'react';
import './login.less';
import withRoot from '../../components/root';
import { History } from 'history';

interface P extends Props<{}> {
  history: History;
}

class Login extends Component<P> {

  public handleGoDeviceList = (): void => {
    this.props.history.push('/devicelist');
  }

  public render(): JSX.Element {
    return (
      <>
        <div className='input-wrap'>
          <p>账号(userid):</p>
          <input type='text' className='input' />
          <p>密码(password):</p>
          <input type='text' className='input' />
        </div>
        <button className='button-login' onClick={this.handleGoDeviceList}>Login</button>
      </>
    );
  }
}

export default withRoot(Login);