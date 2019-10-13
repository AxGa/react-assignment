import React from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles } from '@material-ui/core';
import WellsList from '../layouts/components/Lists/WellsList';
import LogsList from '../layouts/components/Lists/LogsList';
import FormationsList from '../layouts/components/Lists/FormationsList';
import EsaLogo from '../EsaLogo';
import store from "../store/index";
import { WellsPlot } from '../layouts/components/Plot/WellsPlot';

const styles = theme => ({
  button: { marginTop: theme.spacing(3) },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
  plotContainer:{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const useStyles = makeStyles(styles);

export default function Histogram() {
    const classes = useStyles();
    const apiData = store.getState().wells.plotData;
	for(let i=0; i < apiData.length; i++){
        apiData[i].name = `wellId-${apiData[i].wellId}`;
        apiData[i].type = 'histogram';
    }

    return (
    <Dashboard>
        <Grid container spacing={1} >
            <Grid item xs={12} md={5} container spacing={2}>
                <WellsList/>
                <LogsList/>
                <FormationsList/>
        	</Grid>
            <Grid item xs={12} md={7}>
                {store.getState().wells.plotData.length !== 0 ?
                    <div className={classes.plotContainer}>
                      <WellsPlot plotData={apiData}/>
                    </div> : 
                    <div className={classes.logoContainer}>
                      <EsaLogo />
                    </div>
                }
            </Grid>
        </Grid>
    </Dashboard>
  );
}
