import React from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography'

import { fetchDaysLeft } from "../actions/index";

function select(state) {
    return {
        daysLeft : state.daysLeft
    }
}

const map = {
    fetchDaysLeft:fetchDaysLeft
}

function ConnectedDayCounter({daysLeft,fetchDaysLeft}){

    React.useEffect( () => {
        fetchDaysLeft()
    })

    return (
        <Typography variant="h2" component="h2">
          <b>{daysLeft} Tage </b>
        </Typography>
    );
}

const DayCounter = connect(select,map)(ConnectedDayCounter);
  
  export default DayCounter;