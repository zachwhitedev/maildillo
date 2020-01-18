import React, { useState } from 'react';


export default function TodoItem (props){
    const [state, setState] = useState({
        newItem: props.description,
        newColor: props.color
    })

    const handleItemChange = (e) => {
        setState({
            newItem: e.target.value,
        })
    }

    const handleColorChange = (e) => {
        this.setState({
            newColor: e.target.value
            
        })
    }

        if (props.edit){
            return(
                <div>    
                    <textarea style={{backgroundColor: props.color}} onChange={handleItemChange}>{props.description}</textarea><br></br>
                    <select name='newPriority' value={state.newColor} onChange={handleColorChange}>
                        <option value={'#c2ffcc'}>Low Priority</option>
                        <option value={'#ffbd7a'}>Medium Priority</option>
                        <option value={'#ff6161'}>High Priority</option>
                    </select>
                    <button onClick={() => props.saveItem(props.id, state.newItem, state.newColor)}>save</button>
                    <button onClick={() => props.deleteItem(props.id)}>delete</button>

                </div>
            )
        }
        else {
            return(
                <div>
                <li style={{backgroundColor: props.color}}>{props.description}</li>
                <button onClick={() => props.deleteItem(props.id)}>delete</button>
                <button onClick={() => props.editItem(props.id)}>edit</button>
                </div>
            )
        }

} 

export default TodoItem;