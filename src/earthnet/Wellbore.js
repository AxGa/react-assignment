import React from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Grid } from '@material-ui/core';
import WellsList from '../layouts/components/Lists/WellsList';

export default function Wellbore() {
  return (
	<Dashboard>
		<Grid container spacing={1} >
			<Grid item xs={12} md={5} container spacing={2}>
      			<WellsList/>
  			</Grid>
		</Grid>
    </Dashboard>
  );
}
