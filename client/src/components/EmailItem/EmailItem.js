import React, { useState } from 'react';


export default function EmailEmail (props){
    const [state, setState] = useState({
        newEmail: props.description,
        newColor: props.color
    })

    const handleEmailChange = (e) => {
        setState({
            newEmail: e.target.value,
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
                    <textarea style={{backgroundColor: props.color}} onChange={handleEmailChange}>{props.description}</textarea><br></br>
                    <select name='newPriority' value={state.newColor} onChange={handleColorChange}>
                        <option value={'#c2ffcc'}>Low Priority</option>
                        <option value={'#ffbd7a'}>Medium Priority</option>
                        <option value={'#ff6161'}>High Priority</option>
                    </select>
                    <button onClick={() => props.saveEmail(props.id, state.newEmail, state.newColor)}>save</button>
                    <button onClick={() => props.deleteEmail(props.id)}>delete</button>

                </div>
            )
        }
        else {
            return(
                <div>
                <li style={{backgroundColor: props.color}}>{props.description}</li>
                <button onClick={() => props.deleteEmail(props.id)}>delete</button>
                <button onClick={() => props.editEmail(props.id)}>edit</button>
                </div>
            )
        }

} 