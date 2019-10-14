import React, { useState, useEffect }from "react";
import { connect } from "react-redux";
import { fetchLogs, selectLog } from "../../../store/actions/logsActions";
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from '../';
import store from "../../../store/index";

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

const LogsList = (props) => {
  useEffect(() => {
    props.dispatch(fetchLogs());
  }, []);

    const classes = useStyles();
    const [selectedOptions, setSelect] = useState([]);
    const storeSelectedOptions = store.getState().logs.selectedLogs;

    const handleSelect = value => {
      const currentIndex = storeSelectedOptions.indexOf(value);
      const newSelectedOptions = [...storeSelectedOptions];
      if (currentIndex === -1) {
        newSelectedOptions.push(value);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }
      setSelect(newSelectedOptions);
      props.dispatch(selectLog(newSelectedOptions));
    };

    const isSelected = value => storeSelectedOptions.includes(value);

    const { error, loading, logs } = props;
  
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
            <PortletLabel title="Logs" />
          </PortletHeader>
          <PortletContent className={classes.portletContent} noPadding>
            <List>
              {logs.map(
                log => (
                  <ListItem
                    key={log.id}
                    className={classes.listItem}
                    selected={isSelected(log.id)}
                    onClick={() => handleSelect(log.id)}
                  >
                    <ListItemText primary={log.log} />
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
  logs: state.logs.items,
  loading: state.logs.loading,
  error: state.logs.error
});

export default connect(mapStateToProps)(LogsList);