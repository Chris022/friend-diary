import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography'

import 'date-fns';
import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import Center from './Center.js'

import {daysLeftAPI,saveTextAPI,textGetAPI,getToDoAPI} from './request.js'
import { Button } from '@material-ui/core';
import ToDoElementRead from './ToDoElementRead.js';
import ToDoElement from './ToDoElement.js';



const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    height: theme.spacing(10),
    width: "100%",
  },
  calendar: {
    width: theme.spacing(20),
  }
}));

function App() {

  const classes = useStyles();
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [daysLeft, setDaysLeft] = React.useState(10);

  const [toDo,setToDo] = React.useState([])

  const [text1, setText1] = React.useState(10);
  const handleChangeText1 = (event) => {
    setText1(event.target.value);
  };
  const [text2, setText2] = React.useState(10);
  const handleChangeText2 = (event) => {
    setText2(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    daysLeftAPI(setDaysLeft)
    getToDoAPI(setToDo)
  },[])

  useEffect(() => {
    textGetAPI(format(selectedDate,"yyyy-MM-dd"),setText1,setText2)
  },[selectedDate])


  const save = () => {
    saveTextAPI(text1,text2,format(selectedDate,"yyyy-MM-dd"));
  }
  


  return (
    <Center>
      <center>
        <Typography variant="h1" component="h2">
          {daysLeft} Tage Noch
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="yyyy-MM-dd"
              value={selectedDate}
              onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
        <br/>
        <TextField className={classes.text} value={text1} onChange={handleChangeText1} multiline rows={4} id="text1" label="K" variant="outlined"> {text1}</TextField>
        <TextField className={classes.text} value={text2} onChange={handleChangeText2} multiline rows={4} id="text2" label="C" variant="outlined">{text2}</TextField>
        <Button className={classes.text} onClick={save}>Save</Button>
        <br/>
        {toDo.map(toDos => <><ToDoElementRead toDos={toDo} setToDos={setToDo} id={toDos.id} string={toDos["toDo"]}/><br/></>)}
        <br/>
        <ToDoElement toDos={toDo} setToDos={setToDo}></ToDoElement>
      </center>
    </Center>
  );
}

/*
<Button variant="contained">Default</Button>
      <div className={classes.root}>
        <Paper elevation={3} />
      </div>
*/
export default App;
