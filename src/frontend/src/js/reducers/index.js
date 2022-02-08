import { CHANGE_DATE } from "../constants/action-types";
import { CHANGE_ENTRY_TEXT } from "../constants/action-types";
import { SAVE_ENTRYS } from "../constants/action-types";
import { DELTE_TODO } from "../constants/action-types";
import { ADD_TODO } from "../constants/action-types";
import { FETCH_DAYSLEFT } from "../constants/action-types";
import { FETCH_ENTRYS } from "../constants/action-types";
import { FETCH_TODOS } from "../constants/action-types";

const initialState = {
  daysLeft : 0,
  selectedDate : new Date(),
  entrys: {"0": "", "1": ""},
  isSaved: false,
  toDoList: [] //{id,text}
};

function rootReducer(state = initialState, action) {
  switch(action.type){

    case CHANGE_DATE:
      return Object.assign({}, state, {
        selectedDate: action.date
      });

    case CHANGE_ENTRY_TEXT:
      if(action.num==="0"){
        return Object.assign({}, state, {
          entrys: {"0": action.text, "1": state.entrys["1"]},
          isSaved: false
        });
      }
      return Object.assign({}, state, {
        entrys: {"0": state.entrys["0"], "1": action.text}
      });

    case SAVE_ENTRYS:
      return Object.assign({}, state, {
        isSaved: true
      });

    case DELTE_TODO:
      return Object.assign({}, state, {
        toDoList: state.toDoList.filter((toDo) => toDo.id !== action.id)
      });

    case ADD_TODO:
      return Object.assign({}, state, {
        toDoList: [{id:action.id,toDo:action.toDo},...state.toDoList]
      });
    case FETCH_DAYSLEFT:
      return Object.assign({}, state, {
        daysLeft: action.daysLeft
      });
    case FETCH_ENTRYS:
      return Object.assign({}, state, {
        entrys: action.entrys
      });
    case FETCH_TODOS:
      return Object.assign({}, state, {
        toDoList: action.toDoList
      });
      
    default:
      return state;
  }
}

export default rootReducer;