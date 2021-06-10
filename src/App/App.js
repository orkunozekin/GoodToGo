import React, { useState } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import AddItem from '../components/AddItem/AddItem';
import { Route, Switch } from 'react-router-dom';
import Checklist from '../components/Checklist/Checklist';


const App = () => {

  const [items, setItems] = useState([])


  return (
    <main className="App">
      <Header />
      <Switch>
        <Route exact path='/'>
          <Checklist items={items} setItems={setItems} />
        </Route>
        <Route exact path='/add'>
          <AddItem items={items} setItems={setItems} />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
