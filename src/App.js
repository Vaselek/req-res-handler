import React, { Component } from 'react';
import {Route, Switch, NavLink as RouterLink} from "react-router-dom";
import {Collapse, Container, Nav, NavLink, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";
import CitationList from "./containers/CitationList";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Quotes Central</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RouterLink} exact to='/'>Citations</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Switch>
            <Route path='/' exact component={CitationList}></Route>
            <Route path='/citations/:categoryId' component={CitationList}></Route>
            <Route render={()=><div>Not found</div>}></Route>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
