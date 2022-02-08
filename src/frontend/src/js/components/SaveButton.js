import React from "react";
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { saveEntrys } from "../actions/index";


const useStyles = makeStyles((theme) => ({
    text: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      height: theme.spacing(10),
      width: "100%",
    }
}));


const mapDispatchToProps = {
    saveEntrys:saveEntrys
}

function select(state){
    return {
        isSaved: state.isSaved
    }
}

function ConnectedSaveButton ({saveEntrys,isSaved}) {

    const classes = useStyles();

    const handleSave = () => {
        saveEntrys()
    }

    const color = isSaved?{backgroundColor:"green",color:"white"}:{backgroundColor:"white",color:"black"}

    return (
        <Button className={classes.text} onClick={handleSave}  variant="contained" style={color}>Save</Button>
    )

}

const SaveButton = connect(select,mapDispatchToProps)(ConnectedSaveButton);

export default SaveButton;