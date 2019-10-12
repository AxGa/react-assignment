import React from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid } from '@material-ui/core';
import WellsList from '../layouts/components/Lists/WellsList';
import LogsList from '../layouts/components/Lists/LogsList';

export default function Wellbore() {
  return (
	<Dashboard>
		<Grid container spacing={1} >
			<Grid item xs={12} md={5} container spacing={2}>
      			<WellsList/>
      			<LogsList/>
  			</Grid>
		</Grid>
    </Dashboard>
  );
}
