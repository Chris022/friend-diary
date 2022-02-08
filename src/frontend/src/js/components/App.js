import React from "react";
import DayCounter from "./DayCounter";
import DateSelector from "./DateSelector"
import EntryTextField from "./EntryTextField"
import SaveButton from "./SaveButton";
import ToDoList from "./ToDoList";



const App = () => {

  return (
    <>
      <Center>
        <DayCounter />
        <DateSelector/>
        <EntryTextField label="Kay" id="0"/>
        <EntryTextField label="Chris" id="1"/>
        <SaveButton/>
        <ToDoList/>
      </Center>
    </>
  )
}

export default App;

function Center(props){
  return (
    <center>
      <div
      style={{
        position: 'relative', width: '80%'
        }}
      >
        {props.children}

      </div>
    </center>
  )

}