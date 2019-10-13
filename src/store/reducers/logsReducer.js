import { FETCH_LOGS_BEGIN, FETCH_LOGS_SUCCESS, FETCH_LOGS_FAILURE, SELECT_LOG } from '../actions/logsActions';

const initialState = {
	items: [],
	loading: false,
	error: null,
	selectedLogs: []
};

export default function logsReducer( state = initialState, action){
	switch(action.type){
		case FETCH_LOGS_BEGIN:
			// state = "loading" so we can add a preloader
			// reset errors
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_LOGS_SUCCESS:
			// add the fetched data to items
			return {
				...state,
				loading: false,
				items: action.payload.items
			};

		case FETCH_LOGS_FAILURE:
			// Request failed.
			// Save the error.
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};

		case SELECT_LOG:
			return {
				...state,
				selectedLogs: action.payload
			}

		default:
			return state;
	}
}