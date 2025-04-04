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
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import ls from 'local-storage';

// Components
import LocationPicker from './LocationPicker/LocationPicker'
import LoadPointData from './LoadPointData';
import LoadPointDataFcst from './LoadPointDataFcst';
import DisplayChart from './DisplayChart';
import DisplayLocationSummary from './DisplayLocationSummary';
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
        this.token = process.env.REACT_APP_MAPBOX_TOKEN;
        this.gdd_list = ['86/50','50','49','48','47','46','45','44','43','42','41','40',
          '39','38','37','36','35','34','33','32']
        this.currentYear = moment().format('YYYY')
        this.defaultLocation = {
          "address":"Cornell University, Ithaca, NY",
          "lat":42.45,
          "lng":-76.48,
          "id":"default",
          "planting_date":"01/01/"+this.currentYear,
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
          //summaryData: null,
          summaryData: [],
          dataIsLoading: false,
          summaryDataIsLoading: false,
          targetIsEnabled: false,
          freezeIsEnabled: false,
          // view options: 'season-outlook', 'season-to-date', 'summary'
          view: 'season-outlook'
        }
    }

    componentDidMount() {
        // Find all data for a given location
        if ((this.state.locations && this.state.selected)) {
          console.log('v0.2.1');
          this.loadAllData()
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevState.selected!==this.state.selected) {
          this.loadAllData()
        }
        if (prevState.view!=='summary' && this.state.view==='summary') {
          this.loadSummaryData()
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

    loadSummaryData = () => {
      this.handleSummaryDataIsLoadingChange(true)
      let locations = ls.get(this.toolName+'.locations')
      let result = []
      let locationSummary = null
      let gddFcstArray = null
      let dataProcessed, idxLastObsDate, idxTarget
      // loop all saved locations, analyze data, and append to result
      Object.entries(locations).forEach(([k, loc]) => {
          // only list locations with current year planting dates
          if (loc['planting_date'].slice(-4)!==this.currentYear) {
              return;
          }
          LoadPointData({param:this.getAcisParamsObs(loc)})
            .then(response_obs => {

                locationSummary = {
                  'key':loc['id'],
                  //'address':loc['address'].split(',')[0],
                  'address':loc['address'],
                  'planting_date':loc['planting_date'],
                  'gdd_base':'gdd_base' in loc ? loc['gdd_base'] : "50",
                  'gdd_obs':'',
                  'gdd_obs_date':'',
                  'gdd_target':'gdd_target' in loc ? loc['gdd_target'] : "1500",
                  'gdd_target_fcst_date':''
                }

                //handle observed data
                let data_obs = response_obs['data']
                data_obs = data_obs.filter(item => item[1] !== -999 && item[2] !== -999)
                let last_obs_date = data_obs.slice(-1)[0][0]

                dataProcessed = processWeatherData(data_obs,
                    last_obs_date,
                    loc['planting_date'],
                    loc['gdd_base'],
                    loc['freeze_threshold'])

                last_obs_date = dataProcessed['dates_selected_year'].slice(-1)[0]
                idxLastObsDate = dataProcessed['dates_selected_year'].indexOf(last_obs_date)
                locationSummary['gdd_obs'] = dataProcessed['gdd_ytd_selected'][idxLastObsDate]
                locationSummary['gdd_obs_date'] = dataProcessed['dates_selected_year'][idxLastObsDate].slice(5).replace('-','/')

                if (parseInt(locationSummary['gdd_target'],10) > locationSummary['gdd_obs']) {
                    idxLastObsDate = dataProcessed['dates_for_summary'].indexOf(last_obs_date)
                    gddFcstArray = dataProcessed['gdd_ytd_15yr_ave'].map(item =>
                        item + locationSummary['gdd_obs'] - dataProcessed['gdd_ytd_15yr_ave'][idxLastObsDate]
                    );
                    idxTarget = gddFcstArray.findIndex(function(value) {
                        return value >= parseInt(locationSummary['gdd_target'],10);
                    });
                    locationSummary['gdd_target_date'] = dataProcessed['dates_for_summary'][idxTarget].slice(5).replace('-','/')
                } else {
                    idxTarget = dataProcessed['gdd_ytd_selected'].findIndex(function(value) {
                        return value >= parseInt(locationSummary['gdd_target'],10);
                    });
                    locationSummary['gdd_target_date'] = dataProcessed['dates_selected_year'][idxTarget].slice(5).replace('-','/')
                }

                result.push(locationSummary)
                this.handleSummaryDataChange(result)
                this.handleSummaryDataIsLoadingChange(false)
            })
      });
    }

    loadAllData = () => {
          this.handleDataIsLoadingChange(true)
          setTimeout(() => {

            LoadPointData({param:this.getAcisParamsObs(this.state.locations[this.state.selected])})
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

    getAcisParamsObs = (l) => {
          // l : location to get data for
          return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              //"loc":[this.state.locations[this.state.selected]['lng'],this.state.locations[this.state.selected]['lat']].join(),
              "loc":[l['lng'],l['lat']].join(),
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

    handleSummaryDataChange = (d) => {
        this.setState({
          summaryData: d
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

    handleSummaryDataIsLoadingChange = (b) => {
        this.setState({
          summaryDataIsLoading: b
        })
    }

    handlePlantingDateChange = (...e) => {
        // put data in format expected, then pass to handleLocationInfoChange
        if (e[1] && e[1].slice(0,2)<='12') {
          let e_new = { 'target': {'name':'planting_date', 'value':e[1]} }
          this.handleLocationInfoChange(e_new)
        }
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
        let display_LocationSummary;
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
        if (this.state.summaryData) {
            display_LocationSummary = <DisplayLocationSummary
                      dataForTable={this.state.summaryData}
                      dataIsLoading={this.state.summaryDataIsLoading}
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
                  <Typography variant='h6'>
                    <LocationPicker
                      locations={this.state.locations}
                      selected={this.state.selected}
                      newLocationsCallback={this.handleLocationPickerOutput}
                      token={this.token}
                      modalZIndex={150}
                      bbox={{
                        north: 49.458,
                        south: 35.5,
                        east: -66.833,
                        west: -97.5
                      }}
                    />
                  </Typography>
                </Grid>

                <Grid item>
                </Grid>

                <Grid container direction="row" justify="center">

                  {this.state.view!=='summary' &&
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
                  }

                  <Grid item container direction="column" justify="flex-start" alignItems="center" spacing={1} md={9}>
                      {this.state.view==='summary' &&
                      <Grid item container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item>
                          {this.state.pointData && 
                            <Button
                              variant={this.state.view==='summary' ? "contained" : "outlined"} color="primary" size="small"
                              onClick={() => this.handleViewChange('summary')}
                            >
                              Summary (all locations)
                            </Button>
                          }
                        </Grid>
                        <Grid item>
                          {this.state.pointData && 
                            <Button
                              variant={this.state.view==='season-outlook' ? "contained" : "outlined"} color="primary" size="small"
                              onClick={() => this.handleViewChange('season-outlook')}
                            >
                              Charts (selected location)
                            </Button>
                          }
                        </Grid>
                        <Grid item>
                          {this.state.pointData && 
                            <HelpToolPopover content={<HelpMain/>} />
                          }
                        </Grid>
                      </Grid>
                      }

                      <Grid item style={{width:'100%'}}>
                        {this.state.pointData && this.state.view!=='summary' && display_DisplayChart}
                      </Grid>
                      <Grid item style={{width:'100%'}}>
                        {this.state.summaryData && this.state.view==='summary' && display_LocationSummary}
                      </Grid>

                      {this.state.view!=='summary' &&
                      <Grid item container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item>
                          {this.state.pointData && 
                            <Button
                              variant={this.state.view==='summary' ? "contained" : "outlined"} color="primary" size="small"
                              onClick={() => this.handleViewChange('summary')}
                            >
                              Summary Table
                            </Button>
                          }
                        </Grid>
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
                      }

                  </Grid>

                </Grid>

              </Grid>

            </>
        );
    }
}

export default ToolContents;
