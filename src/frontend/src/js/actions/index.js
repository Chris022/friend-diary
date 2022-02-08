import { CHANGE_DATE } from "../constants/action-types";
import { CHANGE_ENTRY_TEXT } from "../constants/action-types";
import { SAVE_ENTRYS } from "../constants/action-types";
import { DELTE_TODO } from "../constants/action-types";
import { ADD_TODO } from "../constants/action-types";
import { FETCH_DAYSLEFT } from "../constants/action-types";
import { FETCH_TODOS } from "../constants/action-types";
import { FETCH_ENTRYS } from "../constants/action-types";

import format  from 'date-fns/format'

const axios = require('axios');

axios.defaults.baseURL = '/';

export function fetchDaysLeft() {
  return function(dispatch) {
    axios.get('/daysLeft')
    .then(response => response.data)
    .then(json => 
      dispatch(
        {
          daysLeft:json.daysleft,
          type:FETCH_DAYSLEFT
        }
      )
    )
    .catch(function (error) {console.log(error);})
  }
}

export function fetchEntrys() {
  return function(dispatch,getState) {
    axios.get('/days/'+format(getState().selectedDate,"yyyy-MM-dd"))
    .then(response => response.data)
    .then(json => 
      dispatch(
        {
          entrys:{"0":json.data1,"1":json.data2},
          type:FETCH_ENTRYS
        }
      )
    )
    .catch(function (error) {console.log(error);})
  }
}

export function fetchToDos() {
  return function(dispatch) {
    axios.get('/toDo')
    .then(response => response.data)
    .then(json => 
      dispatch(
        {
          toDoList: json,
          type:FETCH_TODOS
        }
      )
    )
    .catch(function (error) {console.log(error)});
  }


}


export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    date:date
  }
}

export function changeEntryText(entryNum, text) {
  return {
    num: entryNum,
    text: text,
    type: CHANGE_ENTRY_TEXT
  }
}

export function saveEntrys() {
  return function(dispatch,getState) {
    axios.post('/days',{
      date: format(getState().selectedDate,"yyyy-MM-dd"),
      data2: getState().entrys["1"],
      data1: getState().entrys["0"]
    })
    .then(() => 
      dispatch(
        {
          type: SAVE_ENTRYS
        }
      )
    ).catch( (error) => {console.log(error);})
  }
}

export function deleteToDo(id){

  return function(dispatch) {
    axios.delete('/toDo',{
      data:{
        id: id
      }
    })
    .then( () => 
      dispatch(
        {
          id: id,
          type: DELTE_TODO
        }
      )
    ).catch(function (error) {console.log(error);})
  }

}

export function addToDo(text){
  return function(dispatch) {
    axios.post('/toDo',{
      toDo: text
    }).then(response => response.data)
    .then(json => 
      dispatch(
        {
          id: json.id,
          toDo: text,
          type: ADD_TODO
        }
      )
    ).catch( (error) => {console.log(error);})
  }
}