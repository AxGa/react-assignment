import { FETCH_FORMATIONS_BEGIN, FETCH_FORMATIONS_SUCCESS, FETCH_FORMATIONS_FAILURE, SELECT_FORMATION } from '../actions/formationsActions';

const initialState = {
	items: [],
	loading: false,
	error: null,
	selectedFormations: []
};

export default function formationsReducer( state = initialState, action){
	switch(action.type){
		case FETCH_FORMATIONS_BEGIN:
			// state = "loading" so we can add a preloader
			// reset errors
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_FORMATIONS_SUCCESS:
			// add the fetched data to items
			return {
				...state,
				loading: false,
				items: action.payload.items
			};

		case FETCH_FORMATIONS_FAILURE:
			// Request failed.
			// Save the error.
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};

		case SELECT_FORMATION:
			return {
				...state,
				selectedFormations: action.payload
			}

		default:
			return state;
	}
}