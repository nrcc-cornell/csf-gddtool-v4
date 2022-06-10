///////////////////////////////////////////////////////////////////////////////
//
// Climate Smart Farming Growing Degree Day Calculator
// Copyright (c) 2018 Cornell Institute for Climate Smart Solutions
// All Rights Reserved
//
// This software is published under the provisions of the GNU General Public
// License <http://www.gnu.org/licenses/>. A text copy of the license can be
// found in the file 'LICENSE' included with this software.
//
// A text copy of the copyright notice, licensing conditions and disclaimers
// is available in the file 'COPYRIGHT' included with this software.
//
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';
//import Icon from 'react-icons-kit';
//import { mapMarker } from 'react-icons-kit/fa/mapMarker';       
import jQuery from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/button.css';
import 'jquery-ui/themes/base/dialog.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/button';
import 'jquery-ui/ui/widgets/dialog';
import '../../styles/LocationPicker.css';
import '../../styles/location-dialog.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

window.jQuery = jQuery;

const HOST = 'https://maps.google.com/maps/api/js';
const KEY = 'AIzaSyDv5pQYe9kRbolVUt0o8XSXSQl4g8BHrrQ';
const URL_google_api = `${HOST}?key=${KEY}`;
//const URL_location_dialog = 'http://tools.climatesmartfarming.org/gddtool_react_v3/js/location-dialog-min.js'
//const URL_location_dialog = 'https://cicss.github.io/csf-location-picker-react/assets/location-dialog-min.js'
const URL_location_dialog = 'https://nrcc-cornell.github.io/csf-gddtool-v4/js/location-dialog-min.js'
//const URL_location_dialog = 'https://nrcc-cornell.github.io/csf-location-picker-react/js/location-dialog-min.js'

class LocationPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      googleMapsReady: (window.google) ? true : false,
      locationDialogReady: false,
      mapDialogInitialized: false
    }
  }

  initMapDialog = () => {
    if (!this.state.mapDialogInitialized) {
      var options = { width:600, height:500, google:window.google };
      jQuery(".csftool-location-dialog").CsfToolLocationDialog(options);
      this.map_dialog = jQuery(".csftool-location-dialog").CsfToolLocationDialog();
      this.map_dialog("bind", "close", (ev, context) => {
        let locations_picker = context.all_locations
        let selected_picker = context.selected_location
        this.props.handleOutput(locations_picker,selected_picker);
        //console.log(locations_picker)
        //console.log(selected_picker)
      });
      this.setState({
        mapDialogInitialized: true
      })
    }
  }

  openMap = () => {
    this.map_dialog("locations", this.props.locations);
    this.map_dialog("open", this.props.selected);
  }

  handleScriptsLoaded = () => {
    if (this.state.googleMapsReady && this.state.locationDialogReady) {
      this.initMapDialog();
    }
  }

  handleLocationDialogLoad = () => {
    console.log('location dialog script loaded')
    this.setState({
      locationDialogReady: true
    })
    this.handleScriptsLoaded();
  }

  handleGoogleMapsLoad = () => {
    console.log('google maps script loaded')
    this.setState({
      googleMapsReady: true
    })
    this.handleScriptsLoaded();
  }

  render() {
        return (
            <div className="location-input-div">
              {!this.state.googleMapsReady &&
                <ScriptTag isHydrating={false} type="text/javascript" src={URL_google_api} onLoad={this.handleGoogleMapsLoad} />
              }
              {!this.state.locationDialogReady &&
                <ScriptTag isHydrating={false} type="text/javascript" src={URL_location_dialog} onLoad={this.handleLocationDialogLoad} />
              }
              {this.state.mapDialogInitialized &&
                <Button
                  variant="contained" color="primary" size="small"
                  onClick={this.openMap}
                >
                  Edit
                </Button>
              }
            </div>
        )
  }

};

LocationPicker.propTypes = {
  namespace: PropTypes.string.isRequired,
  locations: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  handleOutput: PropTypes.func.isRequired,
};

export default LocationPicker;
