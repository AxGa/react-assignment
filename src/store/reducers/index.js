import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import actionsReducer from './actions';
import wellsReducer from "./wellsReducer";
import logsReducer from "./logsReducer";
import formationsReducer from "./formationsReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    state: actionsReducer,
    wells: wellsReducer,
   	logs: logsReducer,
   	formations: formationsReducer
  });
