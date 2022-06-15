///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Components
//import LocationPicker from './LocationPicker';
//import LocationPicker from './LocationPicker/LocationPicker'
import PlantingDatePicker from './PlantingDatePicker';
import GddBaseSelect from './GddBaseSelect';
import GddTargetSelect from './GddTargetSelect';
import GddTargetSelectEnable from './GddTargetSelectEnable';
import FreezeThreshSelect from './FreezeThreshSelect';
import FreezeThreshSelectEnable from './FreezeThreshSelectEnable';

//import StationPickerMap from '../../common/StationPickerMap';
//import VarPicker from '../VarPicker';
//import ScenarioPicker from '../ScenarioPicker';
//import TimescalePicker from '../TimescalePicker';
//import PeriodPicker from '../PeriodPicker';
//import HelpUserPopover from '../HelpUserPopover';
//import HelpUserContent from '../HelpUserContent';


class UserInput extends React.Component {
  //constructor(props) {
  //    super(props);
  //}

  render() {
    //const { classes } = this.props;

    return (
      <Box padding={2} border={0} borderRadius={4} borderColor="primary.main">

                    <Grid container item direction="column" spacing={3}>

                      <Grid item container direction="column" justify="center" alignItems="center" spacing={2}>

                        <Grid item>
                          <PlantingDatePicker
                            value={this.props.locations[this.props.selected]['planting_date']}
                            onchange={this.props.onchange_plantingDate}
                          />
                        </Grid>

                        <Grid item>
                          <GddBaseSelect
                            value={this.props.locations[this.props.selected]['gdd_base']}
                            values={this.props.gdd_list}
                            onchange={this.props.onchange_locInfo}
                          />
                        </Grid>

                        <Grid item container direction="row" justify="center" alignItems="flex-end">
                          <GddTargetSelectEnable
                            value={this.props.targetIsEnabled}
                            onchange={this.props.onchange_targetIsEnabled}
                          />
                          <GddTargetSelect
                            value={this.props.locations[this.props.selected]['gdd_target']}
                            enabled={this.props.targetIsEnabled}
                            onchange={this.props.onchange_locInfo}
                          />
                        </Grid>

                        <Grid item container direction="row" justify="center" alignItems="flex-end">
                          <FreezeThreshSelectEnable
                            value={this.props.freezeIsEnabled}
                            onchange={this.props.onchange_freezeIsEnabled}
                          />
                          <FreezeThreshSelect
                            value={this.props.locations[this.props.selected]['freeze_threshold']}
                            enabled={this.props.freezeIsEnabled}
                            onchange={this.props.onchange_locInfo}
                          />
                        </Grid>
                      </Grid>

                    </Grid>

      </Box>
    );
  }
}

UserInput.propTypes = {
  locations: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  targetIsEnabled: PropTypes.bool.isRequired,
  freezeIsEnabled: PropTypes.bool.isRequired,
  gdd_list: PropTypes.array.isRequired,
  //mapbox_token: PropTypes.string.isRequired,
  onchange_locationPicker: PropTypes.func.isRequired,
  onchange_view: PropTypes.func.isRequired,
  onchange_plantingDate: PropTypes.func.isRequired,
  onchange_locInfo: PropTypes.func.isRequired,
  onchange_targetIsEnabled: PropTypes.func.isRequired,
  onchange_freezeIsEnabled: PropTypes.func.isRequired,
};

export default UserInput;
