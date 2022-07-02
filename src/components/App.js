///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//import { inject, observer} from 'mobx-react';
import { MuiThemeProvider, createMuiTheme, withStyles, withTheme  } from "@material-ui/core/styles";
import green from '@material-ui/core/colors/green';

// Components
import ToolContents from '../components/ToolContents'

// Styles
//import '../styles/App.css'

const theme = createMuiTheme({
  //shadows: ["none"],
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
        main: green[800]
    },
    alternativeTextColor: green[800],
  },
  overrides: {
    MUIDataTableBodyRow: {
      root: {
        '&:nth-child(odd)': {
          backgroundColor: '#D3D3D3'
        }
      }
    },
  },
  typography: {
    body2: {
      fontSize: '0.8rem',
      '@media (min-width:960px)': {
        fontSize: '1.0rem',
      },
    },
  }
});

const styles = theme => ({
  root: {},
});

class App extends Component {

    render() {

        return (
            <MuiThemeProvider theme={theme}>
              <div className="App">
                  <ToolContents />
              </div>
            </MuiThemeProvider>
        );

    }
}

export default withStyles(styles)(withTheme(App));
