import React, { Component } from 'react';
import { Welcome } from './components/welcome/welcome'
import { Route, Link, NavLink, Redirect,Prompt } from "react-router-dom"
class App extends Component {
  render() {
    return (
      <Route>
        <Route path='/' component={Welcome} />
      </Route>
    )
  }
}

export { App };