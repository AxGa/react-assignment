export const FETCH_FORMATIONS_BEGIN   = 'FETCH_FORMATIONS_BEGIN';
export const FETCH_FORMATIONS_SUCCESS = 'FETCH_FORMATIONS_SUCCESS';
export const FETCH_FORMATIONS_FAILURE = 'FETCH_FORMATIONS_FAILURE';

export function fetchFormations(){
	return dispatch => {
		dispatch(fetchFormationsBegin());
		return fetch("http://localhost:8000/formations")
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchFormationsSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchFormationsFailure(error)));
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export const fetchFormationsBegin = () => ({
	type: FETCH_FORMATIONS_BEGIN
})

export const fetchFormationsSuccess = items => ({
	type: FETCH_FORMATIONS_SUCCESS,
	payload: { items }
})

export const fetchFormationsFailure = error => ({
	type: FETCH_FORMATIONS_FAILURE,
	payload: error
})