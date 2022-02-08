import React from "react";
import { connect } from "react-redux";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { changeDate } from "../actions/index";
import { fetchEntrys } from "../actions/index";

const mapDispatchToProps = {
    changeDate:changeDate,
    fetchEntrys:fetchEntrys
}

function ConnectedDaySelector ({changeDate,fetchEntrys}) {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        changeDate(date);
    }

    React.useEffect(()=>{
        fetchEntrys()
    },[selectedDate,fetchEntrys])

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="yyyy-MM-dd"
              value={selectedDate}
              onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    )
}

const DaySelector = connect(null, mapDispatchToProps)(ConnectedDaySelector)

export default DaySelector;

