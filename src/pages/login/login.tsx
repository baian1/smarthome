import React, { Props, useState, useCallback, useRef } from 'react';
import './login.less';
import withRoot from 'components/root';
import { History } from 'history';

interface P extends Props<{}> {
  history: History;
  login(userID: string, password: string): Promise<boolean>;
}


function Login(props: P) {
  const [userID, setUserID] = useState('')
  const [passWord, setPassWord] = useState('')
  const Loading = useRef(false)

  const handleGoDeviceList = useCallback(
    (userID: string, passWord: string) => {
      if (Loading.current === true) {
        alert("不要频繁操作");
        return;
      }
      Loading.current = true;
      props.login(userID, passWord).then((value: boolean) => {
        if (value === true) {
          props.history.push('/devicelist');
        }
        Loading.current = false;
        return;
      });
      console.log(userID, passWord)
    }, []
  )

  return (
    <>
      <div className='input-wrap'>
        <p>账号(userid):</p>
        <input type='text' className='input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserID(e.target.value)}} value={userID} />
        <p>密码(password):</p>
        <input type="password" className='input' onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassWord(e.target.value) }} />
      </div>
      <button className='button-login' onClick={() => handleGoDeviceList(userID, passWord)}>Login</button>
    </>
  )
}
let LoginRoor = withRoot(Login)
export { LoginRoor as Login };