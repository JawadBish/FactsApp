import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home.js';
import { Auth } from './components/Auth/Auth.js';
import FactDetails from './components/FactDetails/FactDetails'
const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/facts" />} />
                    <Route path="/facts" exact component={Home} />
                    <Route path="/facts/search" exact component={Home} />
                    <Route path="/facts/:id" component={FactDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/facts" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}





export default App;