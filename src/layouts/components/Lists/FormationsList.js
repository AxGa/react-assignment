import React, { useState, useEffect }from "react";
import { connect } from "react-redux";
import { fetchFormations, selectFormation } from "../../../store/actions/formationsActions";
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton
} from '../';
import store from "../../../store/index";
import { fetchWellsPlot } from "../../../store/actions/wellsActions";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: { marginTop: theme.spacing(3) },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 800
    }
  },
  portletContent: {
    height: 0,
    minHeight: 490,
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  }
});
const useStyles = makeStyles(styles);

const FormationsList = (props) => {
  useEffect(() => {
    props.dispatch(fetchFormations());
  }, []);

    const classes = useStyles();
    const [selectedOptions, setSelect] = useState([]);

    const handleSelect = value => {
      const currentIndex = selectedOptions.indexOf(value);
      const newSelectedOptions = [...selectedOptions];
      if (currentIndex === -1) {
        newSelectedOptions.push(value);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }
      setSelect(newSelectedOptions);
      props.dispatch(selectFormation(newSelectedOptions));
    };

    const isSelected = value => selectedOptions.includes(value);
    
    const isDisabled = () => {
      if(store.getState().formations.selectedFormations.length !== 0 && store.getState().wells.selectedWells.length !== 0 && store.getState().logs.selectedLogs.length !== 0){
        return false;
      }
      else return true;
    }

    const showPlot = () =>{
      props.dispatch(fetchWellsPlot(store.getState().wells.selectedWells));
    }

    const { error, loading, formations } = props;
  
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Grid item xs={4}>
        <Portlet>
          <PortletHeader className={classes.header}>
            <PortletLabel title="Formations" />
          </PortletHeader>
          <PortletContent className={classes.portletContent} noPadding>
            <List>
              {formations.map(
                formation => (
                  <ListItem
                    key={formation.id}
                    className={classes.listItem}
                    selected={isSelected(formation.id)}
                    onClick={() => handleSelect(formation.id)}
                  >
                    <ListItemText primary={formation.name} />
                  </ListItem>
                )
              )}
            </List>
          </PortletContent>
        </Portlet>
        <EsaButton fullWidth className={classes.button} disabled={isDisabled()} onClick={() => showPlot()}>
          Show Plot
        </EsaButton>
      </Grid>
    );
}

const mapStateToProps = state => ({
  formations: state.formations.items,
  loading: state.formations.loading,
  error: state.formations.error
});

export default connect(mapStateToProps)(FormationsList);