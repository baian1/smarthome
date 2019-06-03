import React, { Component, Props, ChangeEvent } from 'react';
import './login.less';
import withRoot from '../../components/root';
import { History } from 'history';

interface P extends Props<{}> {
  history: History;
  login(userID: string, password: string): Promise<boolean>;
}

interface S {
  userID: string;
  passWord: string;
}

class Login extends Component<P, S> {
  public Loading = false;
  public constructor(props: P) {
    super(props);
    this.state = {
      userID: '',
      passWord: ''
    }
  }

  public handleGoDeviceList = (): void => {
    if (this.Loading === true) {
      alert("不要频繁操作");
      return;
    }
    this.Loading = true;
    this.props.login(this.state.userID, this.state.passWord).then((value: boolean) => {
      if (value === true) {
        this.props.history.push('/devicelist');
      }
      this.Loading = false;
      return;
    });
  }

  public handleChangeUserID = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      userID: event.target.value
    })
  }

  public handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passWord: event.target.value
    })
  }

  public render(): JSX.Element {
    return (
      <>
        <div className='input-wrap'>
          <p>账号(userid):</p>
          <input type='text' className='input' onChange={this.handleChangeUserID} value={this.state.userID} />
          <p>密码(password):</p>
          <input type='text' className='input' onChange={this.handleChangePassword} value={this.state.passWord}/>
        </div>
        <button className='button-login' onClick={this.handleGoDeviceList}>Login</button>
      </>
    );
  }
}
let LoginRoor = withRoot(Login)
export { LoginRoor as Login };