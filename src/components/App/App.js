import React from 'react';
import './App.css';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import { Route, withRouter } from 'react-router-dom';
import Checklist from '../Checklist/Checklist';


class App extends React.Component {


  render() {

    return (
      <main className="App">
        <Header />
        <Route exact path='/' component = {Checklist}/>
        <Route exact path='/add' component= {AddItem} />
      </main>
    );
  }
}

export default withRouter(App);
