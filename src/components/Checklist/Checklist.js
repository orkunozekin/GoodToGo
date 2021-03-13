import React, { useEffect, useState } from 'react';
import './Checklist.css';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import { AiFillDelete } from 'react-icons/ai';

const Checklist = (props) => {

    const [items, setItems] = useState([])

    useEffect(() => { //componentDidMount
        getItems();
    }, [])



    const getItems = () => { //get all the items from the server
        return fetch(config.API_ENDPOINT)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(data => setItems(data))
            .catch(error => console.log(error))
    }



    const deleteItems = (itemId) => { //delete an item whose trashcan icon is clicked.
        console.log(itemId)
        return fetch(`${config.API_ENDPOINT}/${itemId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                const newItemsList = items.filter(item => item.id !== itemId)
                setItems(newItemsList)
            })
            .catch(error => console.log(error))
    }


    const checkOffItems = (itemId) => {
        const newItemsList = items.filter(item => item.id !== itemId)
        setItems(newItemsList)
    }

    console.log(items)

    return (
        <section className="checklist-wrapper">
            <form>
                <ul>
                    {items.map((item, index) =>
                        <li key={item.id}><b>{item.name}</b>
                            <AiFillDelete onClick={() => deleteItems(item.id)} />
                        </li>
                    )}
                </ul>
            </form>
            <NavLink to="/add">
                <button className="add-btn">Add More Items</button>
            </NavLink>
        </section>
    )
}

export default Checklist;
