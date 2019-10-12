export const FETCH_WELLS_BEGIN   = 'FETCH_WELLS_BEGIN';
export const FETCH_WELLS_SUCCESS = 'FETCH_WELLS_SUCCESS';
export const FETCH_WELLS_FAILURE = 'FETCH_WELLS_FAILURE';

export function fetchWells(){
	return dispatch => {
		dispatch(fetchWellsBegin());
		return fetch("http://localhost:8000/wells")
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchWellsSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchWellsFailure(error)));
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export const fetchWellsBegin = () => ({
	type: FETCH_WELLS_BEGIN
})

export const fetchWellsSuccess = items => ({
	type: FETCH_WELLS_SUCCESS,
	payload: { items }
})

export const fetchWellsFailure = error => ({
	type: FETCH_WELLS_FAILURE,
	payload: error
})