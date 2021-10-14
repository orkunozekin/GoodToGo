import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

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


    const handleOnDrag = (result) => {
        if (!result.destination) return;
        const listItems = Array.from(items)
        const [reorderedItem] = listItems.splice(result.source.index, 1)
        listItems.splice(result.destination.index, 0, reorderedItem)
        setItems(listItems)
    }

    return (
        <section className="checklist-wrapper">
            {items.length > 0 && !loading &&
                <div className="checklist-div">
                    <DragDropContext onDragEnd={handleOnDrag}>
                        <Droppable droppableId="list-items">
                            {(provided) => {
                                return <ul className="list-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                                    {items && items.map(({ itemName, itemId }, index) =>
                                        <Draggable key={`${itemId}`} draggableId={`${itemId}`} index={index}>
                                            {(provided) => (
                                                <li className="list-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <b className="item-name">{itemName}</b>
                                                    <AiFillDelete key={itemId} onClick={() => deleteItems(itemId, itemName)} />
                                                </li>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </ul>
                            }}
                        </Droppable>
                    </DragDropContext>
                    <NavLink to="/add">
                        <button className="add-btn">Add More Items</button>
                    </NavLink>
                </div>
            }
            {loading && <FaSpinner className="load-icon cl" />}
            {items.length === 0 && !loading &&
                <div className="empty-list">
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
