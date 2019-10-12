export const FETCH_LOGS_BEGIN   = 'FETCH_LOGS_BEGIN';
export const FETCH_LOGS_SUCCESS = 'FETCH_LOGS_SUCCESS';
export const FETCH_LOGS_FAILURE = 'FETCH_LOGS_FAILURE';

export function fetchLogs(){
	return dispatch => {
		dispatch(fetchLogsBegin());
		return fetch("http://localhost:8000/logs")
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchLogsSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchLogsFailure(error)));
	}
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

export const fetchLogsBegin = () => ({
	type: FETCH_LOGS_BEGIN
})

export const fetchLogsSuccess = items => ({
	type: FETCH_LOGS_SUCCESS,
	payload: { items }
})

export const fetchLogsFailure = error => ({
	type: FETCH_LOGS_FAILURE,
	payload: error
})