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
import LocationPicker from './LocationPicker/LocationPicker'
import LoadPointData from './LoadPointData';
import LoadPointDataFcst from './LoadPointDataFcst';
import DisplayChart from './DisplayChart';
import UserInput from './UI/UserInput';
import VarPopover from './VarPopover';
import {HelpMain} from "./HelpToolContent";
import HelpToolPopover from "./HelpToolPopover";

import { processWeatherData } from './processWeatherData';

class ToolContents extends Component {

    constructor(props) {
        super(props);
        //this.toolName = 'TEST';
        this.toolName = 'CSF-GDDTOOL';
        this.token = 'YOUR_TOKEN';
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
          locations: ls(this.toolName+'.locations') || this.defaultLocations,
          selected: ls(this.toolName+'.selected') || this.defaultLocation['id'],
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
          this.loadAllData()
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.selected!==this.state.selected) {
          this.loadAllData()
        }
        if (prevState.locations!==this.state.locations) { ls.set(this.toolName+'.locations',this.state.locations) }
        if (prevState.selected!==this.state.selected) { ls.set(this.toolName+'.selected',this.state.selected) }
    }

    addOneDayToStringDate = (d) => {
      return moment(d,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD')
    }

    subtractOneDayToStringDate = (d) => {
      return moment(d,'YYYY-MM-DD').subtract(1,'days').format('YYYY-MM-DD')
    }

    loadAllData = () => {
          this.handleDataIsLoadingChange(true)
          setTimeout(() => {

            LoadPointData({param:this.getAcisParamsObs()})
              .then(response_obs => {

                //handle observed data
                let data_obs = response_obs['data']
                data_obs = data_obs.filter(item => item[1] !== -999 && item[2] !== -999)
                let last_obs_date = data_obs.slice(-1)[0][0]

                LoadPointDataFcst({param:this.getAcisParamsFcst(last_obs_date)})
                  .then(response_fcst => {

                    //handle forecast data
                    // - need to convert string temperatures to int
                    // - need to convert dates one day forward for consistency with morning obs
                    let data_fcst = []
                    if ('dlyData' in response_fcst) {
                      data_fcst.push(...response_fcst['dlyData'].map(item => [this.addOneDayToStringDate(item[0].split('T')[0]),parseInt(item[2],10),parseInt(item[3],10)]))
                    }
                    if ('dlyFcstData' in response_fcst) {
                      data_fcst.push(...response_fcst['dlyFcstData'].map(item => [this.addOneDayToStringDate(item[0].split('T')[0]),parseInt(item[1],10),parseInt(item[2],10)]))
                    }
                    data_fcst = data_fcst.filter(item => item[0] > last_obs_date)

                    // combine obs and fcst data into one array
                    let data_obs_fcst = data_obs.concat(data_fcst)
                    let result = {'data':data_obs_fcst, 'last_obs_date':last_obs_date}

                    this.handleDataChange(result)
                    this.handleDataIsLoadingChange(false)
                  })
              })
            },
            1000
          );
    }

    getAcisParamsObs = () => {
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
                 "name":"maxt",
                 "interval":[0,0,1]
                },
                {
                 "name":"mint",
                 "interval":[0,0,1]
                }
              ]})
          };
    }

    getAcisParamsFcst = (sdate) => {
          return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "lat":this.state.locations[this.state.selected]['lat'],
              "lon":this.state.locations[this.state.selected]['lng'],
              "tzo":-5,
              //"sdate":"2022061000",
              "sdate":sdate.replaceAll("-","")+"00",
              "edate":"now",
              })
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

    //handleLocationPickerOutput = (l,s) => {
    handleLocationPickerOutput = (s,l) => {
        console.log(s)
        console.log(l)
        // include additional items for each location (items like gdd_base, gdd_target, freeze_threshold, planting_date)
        let l_new = {}
        for (let k in l) {
          if (l.hasOwnProperty(k)) {
            if (this.state.locations.hasOwnProperty(k)) {
              //l_new[k] = { ...this.defaultLocation, ...this.state.locations[k], ...l[k] }
              l_new[k] = { ...this.defaultLocation, ...l[k], ...this.state.locations[k] }
            } else {
              l_new[k] = { ...this.defaultLocation, ...l[k] }
            }
          }
        }
        this.setState({
          locations: l_new,
          //selected: s['id']
          selected: s
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
        if (this.state.pointData) {
            display_DisplayChart = <DisplayChart
                        locInfo={this.state.locations[this.state.selected]}
                        freezeIsEnabled={this.state.freezeIsEnabled}
                        targetIsEnabled={this.state.targetIsEnabled}
                        chartWeatherData={
                          processWeatherData(this.state.pointData['data'],
                          this.state.pointData['last_obs_date'],
                          this.state.locations[this.state.selected]['planting_date'],
                          this.state.locations[this.state.selected]['gdd_base'],
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

        return (
            <>

              <Grid container direction="column" justify="center" spacing={2}>

                <Grid item>
                  <LocationPicker
                    locations={this.state.locations}
                    selected={this.state.selected}
                    newLocationsCallback={this.handleLocationPickerOutput}
                    token={this.token}
                    modalZIndex={150}
                  />
                </Grid>

                <Grid item>
                </Grid>

                <Grid container direction="row" justify="center">

                  <Grid item container direction="column" justify="flex-start" spacing={1} md>
                    <Hidden mdUp>
                        <Grid item>
                          <VarPopover content={display_UserInput} />
                        </Grid>
                    </Hidden>
                    <Hidden smDown>
                        <Grid item>
                          {display_UserInput}
                        </Grid>
                    </Hidden>
                  </Grid>

                  <Grid item container direction="column" justify="center" alignItems="center" spacing={1} md={9}>
                      <Grid item style={{width:'100%'}}>
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
                        <Grid item>
                          {this.state.pointData && 
                            <HelpToolPopover content={<HelpMain/>} />
                          }
                        </Grid>
                      </Grid>
                  </Grid>

                </Grid>

              </Grid>

            </>
        );
    }
}

export default ToolContents;
