import React, { Suspense } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import Welcome from './pages/welcome'
// import Login from './pages/login'
// import Devicelist from './pages/devicelist';
// import Controller from './pages/controller';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootStore from './redux/reducers';
import { Provider } from 'react-redux';
import { StaticContext } from 'react-router';
import AsyncComponent from './pages';

export const store = createStore(rootStore, applyMiddleware(thunk));

function LoadingPlaceholder(): JSX.Element {
  return (
    <>Loading...</>
  )
}

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Route>
          <Suspense fallback={<LoadingPlaceholder />}>
            <Switch>
              {/* <Route path='/login' render={(props: RouteComponentProps<any, StaticContext, any>) => <Login {...props} />} />
              <Route path='/devicelist' component={Devicelist} />
              <Route path='/controller' component={Controller} />
              <Route path='/' component={Welcome} /> */}
              <Route path='/login' render={(props: RouteComponentProps<any, StaticContext, any>) => <AsyncComponent componentName='Login' {...props}/>} />
              <Route path='/devicelist' render={(props: RouteComponentProps<any, StaticContext, any>) => <AsyncComponent componentName='Devicelist' {...props}/>} />
              <Route path='/controller' render={(props: RouteComponentProps<any, StaticContext, any>) => <AsyncComponent componentName='Controller' {...props}/>} />
              <Route path='/' component={Welcome} />
            </Switch>
          </Suspense>
        </Route>
      </Provider>
    )
  }
}

export { App };
