///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const PlantingDatePicker = (props) => {
        //const { classes } = props;
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              views={["date"]}
              variant="inline"
              format="MM/dd/yyyy"
              minDate="01/01/1980"
              minDateMessage="Data unavailable before 1980"
              PopoverProps={{style: {...{left: '180px', top: '-140px'}}}}
              margin="none"
              id="date-picker-inline"
              label="Planting Date"
              value={props.value}
              onChange={props.onchange}
              autoOk={true}
              InputProps={{ readOnly: false }}
              KeyboardButtonProps={{
                'aria-label': 'change planting date',
              }}
              style={{ width: 180 }}
            />
          </MuiPickersUtilsProvider>
        );
}

PlantingDatePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default PlantingDatePicker;
