import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'

import config from '../../config'
import ls from '../../Utility/LocalStorage'

import './AddItem.css'

const AddItem = ({ items, setItems }) => {

  let history = useHistory();

  const [item, setItem] = useState({ // to control the input
    value: '',
    touched: false
  })
  const [loading, setLoading] = useState(false)


  const itemOnChange = (newItem) => { // when user adds this, add 
    setItem({ value: newItem, touched: true })
  }

  const addToList = (e, item) => {
    e.preventDefault();
    setLoading(true)
    ls.addToLocalStorage(item, item)
    const newItem = {
      itemName: item,
      itemType: null
    };
    axios({
      method: 'post',
      url: `${config.API_ENDPOINT}/newItem`,
      data: newItem
    })
      .then((response) => {
        console.log(response)
        if (response.data) {
          let joined = items.concat(item)
          setItems([joined])
          setLoading(false)
          history.push('/')
        }
      })
  }




  return (
    <section>
      <form onSubmit={(e) => addToList(e, item.value)} className="add-item-form">
        <input onChange={e => itemOnChange(e.target.value)} type="text" placeholder="wallet" required />
        {!loading && <button type="submit">Add To My List</button>}
        {loading && <button type="submit">
          <FaSpinner className="load-icon" />
        </button>}
      </form>
    </section>
  )
}

export default AddItem