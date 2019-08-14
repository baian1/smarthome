import React, { Props, useState, useCallback, useRef, useEffect } from "react"
import "./login.less"
import withRoot from "components/root"
import { History } from "history"

interface P extends Props<{}> {
  history: History
  login(userID: string, password: string): Promise<boolean>
}

function Login(props: P) {
  const [userID, setUserID] = useState("mike")
  const [passWord, setPassWord] = useState("mike")
  const Loading = useRef(false)
  const isSetWindowHeight = useRef(false)

  const handleGoDeviceList = useCallback((userID: string, passWord: string) => {
    if (Loading.current === true) {
      alert("不要频繁操作")
      return
    }
    Loading.current = true
    props.login(userID, passWord).then((value: boolean) => {
      if (value === true) {
        props.history.push("/devicelist")
      }
      Loading.current = false
      return
    })
    // console.log(userID, passWord)
  }, [])

  useEffect(() => {
    return () => {
      if (isSetWindowHeight.current === true) {
        let root = document.querySelector("#root") as HTMLDivElement
        root.removeAttribute("style")
      }
    }
  }, [])

  return (
    <>
      <div
        className="input-wrap"
        onFocusCapture={e => {
          if (isSetWindowHeight.current === false) {
            let root = document.querySelector("#root") as HTMLDivElement
            root.setAttribute("style", `height:${window.innerHeight}px`)
            isSetWindowHeight.current = true
          }
          let target = e.target
          setTimeout(() => {
            target.scrollIntoView({
              block: "end",
            })
          }, 300)
        }}>
        <p>账号(userid):</p>
        <input
          type="text"
          className="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserID(e.target.value)
          }}
          value={userID}
        />
        <p>密码(password):</p>
        <input
          type="password"
          className="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassWord(e.target.value)
          }}
          value={passWord}
        />
      </div>
      <button
        className="button-login"
        onClick={() => handleGoDeviceList(userID, passWord)}>
        Login
      </button>
    </>
  )
}
let LoginRoor = withRoot(Login)
export { LoginRoor as Login }
