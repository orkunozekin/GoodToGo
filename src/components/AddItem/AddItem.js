import React, { useState } from 'react';
import './AddItem.css';
import config from '../../config';
import { useHistory } from 'react-router-dom';
import ls from '../../Utility/LocalStorage'


const AddItem = ({ items, setItems }) => {

  let history = useHistory();

  const [item, setItem] = useState({ // to control the input
    value: '',
    touched: false
  })



  const itemOnChange = (newItem) => { // when user adds this, add 
    setItem({ value: newItem, touched: true })
  }

  const addToList = (e, item) => {
    e.preventDefault();
    ls.addToLocalStorage(item, item)
    const newItem = {
      itemName: item,
      itemType: null
    };
    fetch(`${config.API_ENDPOINT}/newItem`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        return res.json();
      })
    let joined = items.concat(item);
    setItems([joined])
    history.push('/');
  }

  return (
    <section>
      <form onSubmit={(e) => addToList(e, item.value)} className="add-item-form">
        <input onChange={e => itemOnChange(e.target.value)} type="text" placeholder="wallet" required />
        <button type="submit">Add To My List</button>
      </form>
    </section>
  )
}

export default AddItem;