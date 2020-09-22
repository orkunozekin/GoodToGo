import React, { useState } from 'react';
import './AddItem.css';
import config from '../../config';
import { withRouter } from 'react-router-dom';


const AddItem = (props) => {

    const [item, setItem] = useState({ // to control the input
        value: '',
        touched: false
    })

    const itemOnChange = (newItem) => { // when user adds this, add 
        setItem({ value: newItem, touched: true })
    }

    const addToList = (item) => {
        const newItem = { name: item };
        console.log(newItem);
        fetch(config.API_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(newItem),
          headers: {
            'content-type': 'application/json',
          }
        })
          .then(res => {
            return res.json();
          })
        props.history.push('/');
      }

    return (
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                addToList(item.value);
            }} className="add-item-form">
                <input onChange={e => itemOnChange(e.target.value)} type="text" placeholder="wallet" required/>
                <button type="submit">Add To My List</button>
            </form>
        </section>
    )
}

export default withRouter(AddItem);