///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 100,
    maxWidth: 120,
  },
});

//const getLabel = (v) => {
//  return v+'°F'
//}

const FreezeThreshSelect = (props) => {
        const { classes } = props;
        return (
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <TextField
                fullWidth
                color='primary'
                label='Frost Temp (°F)'
                margin='none'
                value={props.value}
                disabled={!props.enabled}
                onChange={props.onchange}
                inputProps={{
                  name: 'freeze_threshold',
                  id: 'freeze_threshold',
                }}
              />
            </FormControl>
          </form>
        );
}

FreezeThreshSelect.propTypes = {
  value: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default withStyles(styles)(FreezeThreshSelect);
