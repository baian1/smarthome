import React, { lazy } from "react"

const Controller = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "Controller" */ "./Controller"
  )
)
const DevicesList = lazy(() =>
  import(
    /* webpackPrefetch: true,webpackChunkName: "Devicelist" */ "./Devicelist"
  )
)
const Login = lazy(() =>
  import(/* webpackPrefetch: true,webpackChunkName: "Login" */ "./Login")
)
const AddDevice = lazy(() =>
  import(
    /* webpackPrefetch: true,webpackChunkName: "AddDevice" */ "./AddDevice"
  )
)
// const Welcome = lazy(() => import(/* webpackPrefetch: true,webpackChunkName: "Welcome" */ './Welcome'));

const Components = {
  Controller,
  DevicesList,
  Login,
  AddDevice,
  // Welcome
}

type ComponentsType = keyof typeof Components

interface P {
  componentName: ComponentsType
}

const AsyncComponent = (props: P) => {
  const { componentName } = props
  let newprops: any = { ...props }
  delete newprops.componentName
  // import(`./${componentName}/controller/reducer`).then(({ default: reducer }) => {
  //   injectReducer(rootStore, { key: componentName, reducer });
  // });

  const Component = Components[componentName]

  return <Component {...newprops} />
}

export default AsyncComponent
