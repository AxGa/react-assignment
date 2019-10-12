import React, { useState, useEffect }from "react";
import { connect } from "react-redux";
import { fetchWells } from "../../../store/actions/wellsActions";
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from '../';

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
    minHeight: 550,
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

const WellsList = (props) => {
  useEffect(() => {
    props.dispatch(fetchWells());
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
    };

    const isSelected = value => selectedOptions.includes(value);

    const { error, loading, wells } = props;
  
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
            <PortletLabel title="Wells" />
          </PortletHeader>
          <PortletContent className={classes.portletContent} noPadding>
            <List>
              {wells.map(
                well => (
                  <ListItem
                    key={well.id}
                    className={classes.listItem}
                    selected={isSelected(well.id)}
                    onClick={() => handleSelect(well.id)}
                  >
                    <ListItemText primary={well.name} />
                  </ListItem>
                )
              )}
            </List>
          </PortletContent>
        </Portlet>
      </Grid>
    );
}

const mapStateToProps = state => ({
  wells: state.wells.items,
  loading: state.wells.loading,
  error: state.wells.error
});

export default connect(mapStateToProps)(WellsList);