import React, { Suspense } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom'

import Welcome from './pages/welcome'
// import Login from './pages/login'
// import Devicelist from './pages/devicelist';
// import Controller from './pages/controller';
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootStore, { AppStateInterface } from './state/reducers';
import { Provider } from 'react-redux';
import { StaticContext } from 'react-router';
import AsyncComponent from './pages';
import { AllAction, userAction } from './state/action';
import LoadingPlaceholder from './pages/LoadingPlaceholder';
import { User } from 'api/localStorage';

export const store = createStore(rootStore, applyMiddleware(thunk as ThunkMiddleware<AppStateInterface, AllAction>));
async function initstore(){
  store.dispatch(userAction.saveUserID(await User.get('id')))
  store.dispatch(userAction.saveToken(await User.get("token")))
  store.dispatch(userAction.saveDevicesList(await User.get('devices')))
}
initstore()

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
              <Route path='/login' render={(props: RouteComponentProps<{}, StaticContext, any>) => <AsyncComponent componentName='Login' {...props} />} />
              <Route path='/devicelist' render={(props: RouteComponentProps<{}, StaticContext, any>) => <AsyncComponent componentName='Devicelist' {...props} />} />
              <Route path='/controller' render={(props: RouteComponentProps<{}, StaticContext, any>) => <AsyncComponent componentName='Controller' {...props} />} />
              <Route path='/wellcome' component={Welcome} />
              <Route path='/addDevice' render={(props: RouteComponentProps<{}, StaticContext, any>) => <AsyncComponent componentName='AddDevice' {...props} />} />
            </Switch>
          </Suspense>
        </Route>
      </Provider>
    )
  }
}

export { App };
