import React, { useEffect } from 'react';
import './Checklist.css';
import { NavLink } from 'react-router-dom';
import config from '../../config';
import { AiFillDelete } from 'react-icons/ai';

const Checklist = ({ items, setItems }) => {


    useEffect(() => {
        const getItems = async () => {
            const request = await fetch(`${config.API_ENDPOINT}/allItems`);
            const data = await request.json();
            console.log("list of items: ", data);
            setItems(data);
        }

        getItems()
        // eslint-disable-next-line
    }, [])



    //delete an item whose trashcan icon is clicked.
    const deleteItems = (itemId) => {
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
            {items.length ? <form>
                <ul>
                    {items && items.map((item, index) =>
                        <li key={index}><b>{item.itemName}</b>
                            <AiFillDelete key={index} onClick={() => deleteItems(item.itemId)} />
                        </li>
                    )}
                </ul>
            </form> :
                <h2>List Empty</h2>
            }

            <NavLink to="/add">
                <button className="add-btn">Add More Items</button>
            </NavLink>
        </section>

    )
}

export default Checklist;
