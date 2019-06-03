import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Welcome from './pages/welcome'
import Login from './pages/login'
import DeviceList from './pages/devicelist';
import Controllor from './pages/controller';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootStore from './redux/reducers';
import { Provider } from 'react-redux';

export const store = createStore(rootStore, applyMiddleware(thunk));

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Route>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/devicelist' component={DeviceList} />
            <Route path='/controller' component={Controllor} />
            <Route path='/' component={Welcome} />
          </Switch>
        </Route>
      </Provider>
    )
  }
}

export { App };
