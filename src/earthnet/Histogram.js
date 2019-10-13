import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles } from '@material-ui/core';
import WellsList from '../layouts/components/Lists/WellsList';
import LogsList from '../layouts/components/Lists/LogsList';
import FormationsList from '../layouts/components/Lists/FormationsList';
import EsaLogo from '../EsaLogo';
import store from "../store/index";
import { WellsPlot } from '../layouts/components/Plot/WellsPlot';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';

const styles = theme => ({
  button: { marginTop: theme.spacing(3) },
  paper: {
    padding: theme.spacing(3)
  },
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
    const [barModeValue, onChangeBarMode] = useState('group');
    const [orientationValue, onChangeOrientation] = useState('v');
    const apiData = store.getState().wells.plotData;
    for(let i=0; i < apiData.length; i++){
        apiData[i].name = `wellId-${apiData[i].wellId}`;
        apiData[i].orientation = orientationValue;
        apiData[i].type = 'histogram';
    }

    return (
    <Dashboard>
        <Grid container spacing={1} >
            <Grid item xs={12} md={5} container spacing={2}>
                <Grid item xs={12} container>
                    <Grid item xs={12}>
                      <EsaPaper className={classes.paper}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <EsaSelect
                              label="Bar Mode"
                              value={barModeValue}
                              options={[
                                { key: 'group', value: 'group', text: 'group' },
                                { key: 'stack', value: 'stack', text: 'stack' }
                              ]}
                              onChange={value => onChangeBarMode(value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <EsaSelect
                              label="Orientation"
                              value={orientationValue}
                              options={[
                                { key: 'vertical', value: 'v', text: 'Vertical' },
                                { key: 'horizontal', value: 'h', text: 'Horizontal' }
                              ]}
                              onChange={value => onChangeOrientation(value)}
                            />
                          </Grid>
                        </Grid>
                      </EsaPaper>
                    </Grid>
                </Grid>
                <WellsList/>
                <LogsList/>
                <FormationsList/>
        	</Grid>
            <Grid item xs={12} md={7}>
                {store.getState().wells.plotData.length !== 0 ?
                    <div className={classes.plotContainer}>
                      <WellsPlot plotData={apiData} barMode={barModeValue}/>
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
