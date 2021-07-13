import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'

import config from '../../config'
import ls from '../../Utility/LocalStorage'

import './Checklist.css'

const Checklist = ({ items, setItems }) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getItems()
        // eslint-disable-next-line
    }, [])

    const getItems = async () => {
        setLoading(true)
        const request = await fetch(`${config.API_ENDPOINT}/allItems`);
        const data = await request.json();
        console.log("list of items: ", data);
        if (data) {
            setItems(data);
            setLoading(false)
        }

    }

    //delete an item whose trashcan icon is clicked.
    const deleteItems = (itemId, itemName) => {
        console.log(itemId)
        return fetch(`${config.API_ENDPOINT}item/${itemId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                const newItemsList = items.filter(item => item.itemId !== itemId)
                ls.deleteFromLocalStorage(itemName)
                setItems(newItemsList)

            })
            .catch(error => console.log(error))
    }


    // const checkOffItems = (itemId) => {
    //     const newItemsList = items.filter(item => item.id !== itemId)
    //     setItems(newItemsList)
    // }


    return (
        <section className="checklist-wrapper">
            {items.length > 0 && !loading &&
                <div>
                    <form>
                        <ul>
                            {items && items.map((item, index) =>
                                <li key={index}><b>{item.itemName}</b>
                                    <AiFillDelete key={index} onClick={() => deleteItems(item.itemId, item.itemName)} />
                                </li>
                            )}
                        </ul>
                    </form>
                    <NavLink to="/add">
                        <button className="add-btn">Add More Items</button>
                    </NavLink>
                </div>
            }
            {loading && <FaSpinner className="load-icon cl" />}
            {items.length === 0 &&
                <div>
                    <h2>Your list is empty</h2>
                    <NavLink to="/add">
                        <button className="add-btn">Add Items</button>
                    </NavLink>
                </div>
            }
        </section>

    )
}

export default Checklist;
