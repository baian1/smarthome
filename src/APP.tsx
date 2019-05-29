import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Welcome from './pages/welcome'
import Login from './pages/login'
import DeviceList from './pages/devicelist';
import Controllor from './pages/controller';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Route>
        <Switch>
          <Route path='/login' c ompon ent={Login} />
          <Route path='/devicelist' c omponent={DeviceList} />
          <Route path='/controllor' c omponent={Controllor} />
          <Route path='/' c omponen t={Welcome} />
        </Switch>
      </Route>
    )
  }
}

export { App };
