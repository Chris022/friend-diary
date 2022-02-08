import React from "react";

import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import { deleteToDo } from "../actions/index";
import { addToDo } from "../actions/index";
import { fetchToDos } from "../actions/index";

function select(state){
    return {
        toDoList:state.toDoList
    }
}

const map = {
    deleteToDo: deleteToDo,
    addToDo: addToDo,
    fetchToDos:fetchToDos
}

function ConnectedToDoList({toDoList,deleteToDo,addToDo,fetchToDos}) {

    React.useEffect(()=>{
        fetchToDos()
    },[])

    const handelDelete = (id) => {
        deleteToDo(id);
    }

    const handelAddToDo = (text) => {
        addToDo(text)
    }

    return (
        <>
        {toDoList.map((element) => 
            <div key={element["id"]}><ToDoElementRead id={element["id"]} text={element["toDo"]} onDelete={handelDelete}/> <br/></div>
        )}
        <ToDoElementAdd addToDo={handelAddToDo}/>
        </>
    );
}

const ToDoList = connect(select,map)(ConnectedToDoList);

export default ToDoList;

function ToDoElementRead({id,text,onDelete}){
    return (
        <>
            <TextField value={text} 
                        InputProps={{
                            readOnly: true,
                        }}></TextField>
            <Button onClick={()=>onDelete(id)}><DeleteIcon color="secondary"/></Button>
        </>
    );
}

function ToDoElementAdd({addToDo}){

    const [text,setText] = React.useState("")

    const handleAdd = () =>{
        addToDo(text)
    }

    return (
        <>
            <TextField value={text} onChange={event => setText(event.target.value)}></TextField>
            <Button onClick={handleAdd}><AddIcon/></Button>
        </>
    );
}
