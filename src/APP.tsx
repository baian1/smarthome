import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"

import Welcome from './pages/welcome'
import Login from './pages/login'
import DeviceList from './pages/devicelist';
import Controllor from './pages/controller';

class App extends Component {
  render() {
    return (
      <Route>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/devicelist' component={DeviceList} />
          <Route path='/controllor' component={Controllor} />
          <Route path='/' component={Welcome} />
        </Switch>
      </Route>
    )
  }
}

export { App };