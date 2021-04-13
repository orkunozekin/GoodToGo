import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import AddItem from '../AddItem/AddItem';
import { Route } from 'react-router-dom';
import Checklist from '../Checklist/Checklist';


const App = () => {

  const [items, setItems] = useState([])


  return (
    <main className="App">
      <Header />
      <Route exact path='/'>
        <Checklist items={items} setItems={setItems} />
      </Route>
      <Route exact path='/add' component={AddItem} />
    </main>
  );
}

export default App;
