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
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ls from 'local-storage';

// Components
import LoadPointData from './LoadPointData';
import DisplayChart from './DisplayChart';
import UserInput from './UI/UserInput';
import VarPopover from './VarPopover';

import { processWeatherData } from './processWeatherData';

class ToolContents extends Component {

    constructor(props) {
        super(props);
        this.gdd_list = ['86/50','50','49','48','47','46','45','44','43','42','41','40',
          '39','38','37','36','35','34','33','32']
        this.defaultLocation = {
          "address":"Cornell University, Ithaca, NY",
          "lat":42.45,
          "lng":-76.48,
          "id":"default",
          "planting_date":"01/01/2022",
          "gdd_base":"50",
          "gdd_target":"1500",
          "freeze_threshold":"32",
        }
        this.defaultLocations = {
          'default':this.defaultLocation
        }
        this.state = {
          locations: ls('CSF-GDDTOOL.locations') || this.defaultLocations,
          selected: ls('CSF-GDDTOOL.selected') || this.defaultLocation['id'],
          pointData: null,
          dataIsLoading: false,
          targetIsEnabled: false,
          freezeIsEnabled: false,
          // view options: 'season-outlook', 'season-to-date', 'climate-change', 'summary'
          view: 'season-outlook'
        }
    }

    componentDidMount() {
        // Find all data for a given location
        if ((this.state.locations && this.state.selected)) {
          this.handleDataIsLoadingChange(true)
          setTimeout(() => {
            LoadPointData({param:this.getAcisParamsGDD()})
              .then(response => {
                this.handleDataChange(response)
                this.handleDataIsLoadingChange(false)
              })
            },
            1000
          );
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.selected!==this.state.selected ||
            prevState.locations[prevState.selected]['planting_date']!==this.state.locations[this.state.selected]['planting_date'] ||
            prevState.locations[prevState.selected]['gdd_base']!==this.state.locations[this.state.selected]['gdd_base']) {
          this.handleDataIsLoadingChange(true)
          setTimeout(() => {
            LoadPointData({param:this.getAcisParamsGDD()})
              .then(response => {
                this.handleDataChange(response)
                this.handleDataIsLoadingChange(false)
              })
            },
            1000
          );
        }
        if (prevState.locations!==this.state.locations) { ls.set('CSF-GDDTOOL.locations',this.state.locations) }
        if (prevState.selected!==this.state.selected) { ls.set('CSF-GDDTOOL.selected',this.state.selected) }
    }

    getAcisParamsGDD = () => {
          return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "loc":[this.state.locations[this.state.selected]['lng'],this.state.locations[this.state.selected]['lat']].join(),
              "sdate":"1980-01-01",
              "edate":moment().format("YYYY-MM-DD"),
              "grid":"nrcc-model",
              "elems":[
                {
                 "name":"gdd",
                 "base":this.state.locations[this.state.selected]['gdd_base']==='86/50' ? 50 : parseInt(this.state.locations[this.state.selected]['gdd_base'],10),
                 "limit":this.state.locations[this.state.selected]['gdd_base']==='86/50' ? [86,50] : [1000,-1000],
                 "interval":[0,0,1],
                 "duration":"std",
                 "season_start":[parseInt(this.state.locations[this.state.selected]['planting_date'].slice(0,2),10),parseInt(this.state.locations[this.state.selected]['planting_date'].slice(3,5),10)],
                 "reduce":"sum",
                 "maxmissing":"0"
                },
                {
                 "name":"mint",
                 "interval":[0,0,1]
                }
              ]})
          };
    }

    handleSelectedLocationChange = (v) => {
        this.setState({
          selected: v
        })
    }

    handleLocationInfoChange = (e) => {
        let k = e.target.name
        let v = e.target.value
        this.setState(prevState => ({
          ...prevState,
          locations : {
              ...prevState.locations, ...{[prevState.selected] : {...prevState.locations[prevState.selected], [k]: v} }
          }
        }) )
    }

    handleLocationPickerOutput = (l,s) => {
        // include additional items for each location (items like gdd_base, gdd_target, freeze_threshold, planting_date)
        let l_new = {}
        for (let k in l) {
          if (l.hasOwnProperty(k)) {
            if (this.state.locations.hasOwnProperty(k)) {
              l_new[k] = { ...this.defaultLocation, ...this.state.locations[k], ...l[k] }
            } else {
              l_new[k] = { ...this.defaultLocation, ...l[k] }
            }
          }
        }
        this.setState({
          locations: l_new,
          selected: s['id']
        })
    }

    handleDataChange = (d) => {
        this.setState({
          pointData: d
        })
    }

    handleViewChange = (v) => {
        this.setState({
          view: v
        })
    }

    handleDataIsLoadingChange = (b) => {
        this.setState({
          dataIsLoading: b
        })
    }

    handlePlantingDateChange = (...e) => {
        // put data in format expected, then pass to handleLocationInfoChange
        let e_new = { 'target': {'name':'planting_date', 'value':e[1]} }
        this.handleLocationInfoChange(e_new)
    }

    handleTargetIsEnabledChange = () => {
        this.setState(prevState => ({
          targetIsEnabled: !prevState.targetIsEnabled
        }) )
    }

    handleFreezeIsEnabledChange = () => {
        this.setState(prevState => ({
          freezeIsEnabled: !prevState.freezeIsEnabled
        }) )
    }

    render() {

        let display_DisplayChart;
        let display_UserInput;
        let display_VarPopover;
        if (this.state.pointData) {
            display_DisplayChart = <DisplayChart
                        locInfo={this.state.locations[this.state.selected]}
                        freezeIsEnabled={this.state.freezeIsEnabled}
                        targetIsEnabled={this.state.targetIsEnabled}
                        chartWeatherData={
                          processWeatherData(this.state.pointData['data'],
                          this.state.locations[this.state.selected]['planting_date'],
                          this.state.locations[this.state.selected]['freeze_threshold'])
                        }
                        view={this.state.view}
                        dataIsLoading={this.state.dataIsLoading}
                      />
        }

        display_UserInput = <UserInput
                                  locations={this.state.locations}
                                  selected={this.state.selected}
                                  view={this.state.view}
                                  targetIsEnabled={this.state.targetIsEnabled}
                                  freezeIsEnabled={this.state.freezeIsEnabled}
                                  gdd_list={this.gdd_list}
                                  onchange_locationPicker={this.handleLocationPickerOutput}
                                  onchange_view={this.handleViewChange}
                                  onchange_plantingDate={this.handlePlantingDateChange}
                                  onchange_locInfo={this.handleLocationInfoChange}
                                  onchange_targetIsEnabled={this.handleTargetIsEnabledChange}
                                  onchange_freezeIsEnabled={this.handleFreezeIsEnabledChange}
                                />

        display_VarPopover = <VarPopover content={display_UserInput} />;

        return (
            <>

                <Grid container direction="row" justify="stretch" spacing={0}>

                  <Grid item container direction="column" justify="top" alignItems="center" spacing={1} md>
                    <Hidden mdUp>
                      {display_VarPopover}
                    </Hidden>
                    <Hidden smDown>
                      {display_UserInput}
                    </Hidden>
                  </Grid>

                  <Grid item container direction="column" justify="center" alignItems="center" spacing={1} md={9}>
                      <Grid item style={{width:'100%', height:'70vh'}}>
                        {this.state.pointData && display_DisplayChart}
                      </Grid>
                      <Grid item container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item>
                          {this.state.pointData && 
                            <Button
                              variant={this.state.view==='season-to-date' ? "contained" : "outlined"} color="primary" size="small"
                              onClick={() => this.handleViewChange('season-to-date')}
                            >
                              Season To Date
                            </Button>
                          }
                        </Grid>

                        <Grid item>
                          {this.state.pointData && 
                            <Button
                              variant={this.state.view==='season-outlook' ? "contained" : "outlined"} color="primary" size="small"
                              onClick={() => this.handleViewChange('season-outlook')}
                            >
                              Season Outlook
                            </Button>
                          }
                        </Grid>
                      </Grid>
                  </Grid>

                </Grid>


                <div className="csftool-location-dialog">
                </div>
            </>
        );
    }
}

export default ToolContents;
