import React, { lazy } from 'react';

const Controller = lazy(() => import(/* webpackChunkName: "Controller" */ './Controller'));
const Devicelist = lazy(() => import(/* webpackChunkName: "Devicelist" */ './Devicelist'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ './Login'));
const AddDevice = lazy(() => import(/* webpackChunkName: "AddDevice" */'./AddDevice'));
// const Welcome = lazy(() => import(/* webpackChunkName: "Welcome" */ './Welcome'));

const Components = {
  Controller,
  Devicelist,
  Login,
  AddDevice,
  // Welcome
};

type ComponentsType = keyof typeof Components

interface P {
  componentName: ComponentsType;
}

const AsyncComponent = (props: P) => {
  const { componentName } = props;
  let newprops: any = { ...props };
  delete newprops.componentName;
  // import(`./${componentName}/controller/reducer`).then(({ default: reducer }) => {
  //   injectReducer(rootStore, { key: componentName, reducer });
  // });

  const Component = Components[componentName];

  return <Component {...newprops} />;
};

export default AsyncComponent;