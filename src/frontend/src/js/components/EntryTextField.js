import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


import { changeEntryText } from "../actions/index";


const useStyles = makeStyles((theme) => ({
    text: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      height: theme.spacing(10),
      width: "100%",
    }
}));


const mapDispatchToProps = {
    changeEntryText:changeEntryText
}

function select(state){
    return {
        entrys : state.entrys
    }
}


function ConnectedEntryTextField({id, label,entrys,changeEntryText}){

    const classes = useStyles();

    const [text, setText] = React.useState("");

    React.useEffect(() => {
        setText(entrys[id])
    },[entrys,id])

    const handleChangeText = (event) => {
        setText(event.target.value)
        changeEntryText(id,event.target.value)
    }

    return (
        <TextField 
            className={classes.text}
            value={text} 
            onChange={handleChangeText} 
            multiline 
            rows={4} 
            id={id}
            label={label} 
            variant="outlined"
        >
            {text}
        </TextField>
    )
}

const EntryTextField = connect(select,mapDispatchToProps)(ConnectedEntryTextField)

export default EntryTextField;
