import { Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import {deleteToDoAPI} from './request.js'

function ToDoElementRead(props) {

    const onClick = () => {
        deleteToDoAPI(props.id); 
        props.setToDos((props.toDos).filter((obj) => obj.id != props.id))
    }

    return (
        <>
        <TextField value={props.string} 
                    InputProps={{
                        readOnly: true,
                    }}></TextField>
        <Button onClick={onClick}><DeleteIcon color="secondary"/></Button>
        </>
    );
}
  
  export default ToDoElementRead;