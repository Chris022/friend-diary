import React, { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import {addToDo} from './request.js'

function ToDoElementRead(props) {

    const [txt, setTxt] = useState("")

    const add = () => {
        addToDo(txt)
        props.setToDos([{"toDo":txt},...props.toDos])
    }

    return (
        <>
        <TextField value={txt} onChange={event => setTxt(event.target.value)}></TextField>
        <Button onClick={add}><AddIcon/></Button>
        </>
    );
}
  
  export default ToDoElementRead;