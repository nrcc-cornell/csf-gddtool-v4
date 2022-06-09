///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 160,
  },
  menuPaper: {
    maxHeight: 190,
    backgroundColor: green[600],
    color: '#ffffff',
  }
});

const getLabel = (v) => {
  return v+'°F'
}

const GddBaseSelect = (props) => {
        const { classes } = props;
        return (
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="gdd_base">GDD Base</InputLabel>
              <Select
                value={props.value}
                onChange={props.onchange}
                margin='normal'
                MenuProps={{ classes: { paper: classes.menuPaper } }}
                inputProps={{
                  name: 'gdd_base',
                  id: 'gdd_base',
                }}
              >
                {props.values &&
                  props.values.map((v,i) => (
                    <MenuItem key={i} value={v}>{getLabel(v)}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </form>
        );
}

GddBaseSelect.propTypes = {
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default withStyles(styles)(GddBaseSelect);
