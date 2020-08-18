import React from 'react';
import './App.css';
import styles from './app.module.scss';
import { AppBarSearch  ,HomePage , VidepPage, SerchPage ,TrendingPage} from './components';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import {CssBaseline, Container} from '@material-ui/core';



function App() {
  
  return (    
    <React.Fragment>
      <Router forceRefresh={true}>
      <CssBaseline />
        <AppBarSearch/>
      <Container className={styles.container}>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/video" exact component={VidepPage}/>
          <Route path="/video/:id" component={VidepPage}/>
          <Route path="/search/" exact component={SerchPage}/>
          <Route path="/search/:q" exact component={SerchPage}/>
          <Route path="/trending" exact component={TrendingPage}/>
        </Switch>
      </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
