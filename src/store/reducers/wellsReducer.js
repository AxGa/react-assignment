import { 
	FETCH_WELLS_BEGIN,
	FETCH_WELLS_SUCCESS, 
	FETCH_WELLS_FAILURE, 
	SELECT_WELL,
	FETCH_WELLS_PLOT_BEGIN,
	FETCH_WELLS_PLOT_SUCCESS,
	FETCH_WELLS_PLOT_FAILURE 
} from '../actions/wellsActions';

const initialState = {
	items: [],
	loading: false,
	error: null,
	selectedWells: [],
	plotData: []
};

export default function wellsReducer( state = initialState, action){
	switch(action.type){
		case FETCH_WELLS_BEGIN:
			// state = "loading" so we can add a preloader
			// reset errors
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_WELLS_SUCCESS:
			// add the fetched data to items
			return {
				...state,
				loading: false,
				items: action.payload.items
			};

		case FETCH_WELLS_FAILURE:
			// Request failed.
			// Save the error.
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};

		case SELECT_WELL:
			return {
				...state,
				selectedWells: action.payload
			}

		case FETCH_WELLS_PLOT_BEGIN:
			return {
				...state,
				plotLoading: true,
				error: null
			};

		case FETCH_WELLS_PLOT_SUCCESS:
			return {
				...state,
				plotLoading: false,
				plotData: action.payload.data
			};

		case FETCH_WELLS_PLOT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				plotData: []
			};

		default:
			return state;
	}
}