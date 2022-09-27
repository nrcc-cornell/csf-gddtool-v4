import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';

const DisplayLocationSummary = (props) => {

    let dateDiffInDays = (a,b) => {
        var a_moment = moment(a,'MM/DD/YYYY');
        var b_moment = moment(b,'MM/DD/YYYY');
        var diffDays = b_moment.diff(a_moment, 'days');
        return diffDays;
    }

    let getCellColors = (planting_date,gdd_obs_date,gdd_target_date) => {
        let result
        let year = planting_date.split('/').slice(-1)[0]
        let gdd_date = moment(gdd_obs_date+'/'+year,'MM/DD/YYYY')
        let target_date = moment(gdd_target_date+'/'+year,'MM/DD/YYYY')

        let backgroundColor = null
        let textColor = null
        if (target_date<gdd_date) {
            backgroundColor = 'green'
            textColor = 'white'
        } else if (dateDiffInDays(gdd_date,target_date)<14) {
            backgroundColor = 'yellow'
            textColor = 'black'
        } else {
            backgroundColor = null
            textColor = 'black'
        }

        result = {
            backgroundColor: backgroundColor,
            color: textColor
        }
        return result
    }

    return(

      <>
        {props.dataForTable &&
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell align="right">Planting Date</TableCell>
                    <TableCell align="right">Base&nbsp;(°F)</TableCell>
                    <TableCell align="right">GDD&nbsp;(Obs Date)</TableCell>
                    <TableCell align="right">Target&nbsp;(Fcst Date)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.dataForTable.map((row) => (
                    <TableRow
                      key={row.key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.address}
                      </TableCell>
                      <TableCell align="right">{row.planting_date}</TableCell>
                      <TableCell align="right">{row.gdd_base}</TableCell>
                      <TableCell align="right">{parseInt(row.gdd_obs,10).toString()+' ('+row.gdd_obs_date+')'}</TableCell>
                      <TableCell align="right" style={getCellColors(row.planting_date,row.gdd_obs_date,row.gdd_target_date)}>{row.gdd_target+' ('+row.gdd_target_date+')'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        }

        <br/>

        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item>
            <div style={{padding:10,color:'white',backgroundColor:'green'}}>
              Target reached
            </div>
          </Grid>
          <Grid item>
            <div style={{padding:10,color:'black',backgroundColor:'yellow'}}>
              Target date within two weeks
            </div>
          </Grid>
        </Grid>

        {props.dataIsLoading &&
          <Backdrop
            style={{zIndex:1000}}
            invisible={true}
            //open={!props.values}
            open={props.dataIsLoading}
          >
            <CircularProgress size={200} color="primary"/>
          </Backdrop>
        }
      </>

    );


}

DisplayLocationSummary.propTypes = {
  dataForTable: PropTypes.array.isRequired,
  dataIsLoading: PropTypes.bool.isRequired,
};

export default DisplayLocationSummary;
