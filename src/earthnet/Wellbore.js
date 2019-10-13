import React from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid, makeStyles } from '@material-ui/core';
import WellsList from '../layouts/components/Lists/WellsList';
import LogsList from '../layouts/components/Lists/LogsList';
import FormationsList from '../layouts/components/Lists/FormationsList';
import EsaLogo from '../EsaLogo';

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
  }
});
const useStyles = makeStyles(styles);

export default function Wellbore() {
	const classes = useStyles();
	return (
	<Dashboard>
		<Grid container spacing={1} >
			<Grid item xs={12} md={5} container spacing={2}>
	  			<WellsList/>
	  			<LogsList/>
	  			<FormationsList/>
				</Grid>
				<Grid item xs={12} md={7}>
	          <div className={classes.logoContainer}>
	            <EsaLogo />
	          </div>
	        </Grid>
		</Grid>
	</Dashboard>
  );
}
