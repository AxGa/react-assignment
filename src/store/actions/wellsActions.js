export const FETCH_WELLS_BEGIN   = 'FETCH_WELLS_BEGIN';
export const FETCH_WELLS_SUCCESS = 'FETCH_WELLS_SUCCESS';
export const FETCH_WELLS_FAILURE = 'FETCH_WELLS_FAILURE';
export const SELECT_WELL = 'SELECT_WELL';
export const FETCH_WELLS_PLOT_BEGIN   = 'FETCH_WELLS_PLOT_BEGIN';
export const FETCH_WELLS_PLOT_SUCCESS = 'FETCH_WELLS_PLOT_SUCCESS';
export const FETCH_WELLS_PLOT_FAILURE = 'FETCH_WELLS_PLOT_FAILURE';

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

export function fetchWellsPlot(wells) {
	let params = "";
	for(let i = 0; i < wells.length; i++){
		params += `wellId=${wells[i]}&`
	}
	return dispatch => {
	dispatch(fetchWellsPlotBegin());
	return fetch(`http://localhost:8000/plots?${params}`)
		.then(handleErrors)
		.then(res => res.json())
		.then(json => {
		dispatch(fetchWellsPlotSuccess(json));
		return json;
		})
		.catch(error => dispatch(fetchWellsPlotFailure(error)));
	};
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

export function selectWell(payload) {
  return {
    type: SELECT_WELL,
    payload
  }
}

export const fetchWellsPlotBegin = () => ({
	type: FETCH_WELLS_PLOT_BEGIN
});

export const fetchWellsPlotSuccess = data => ({
	type: FETCH_WELLS_PLOT_SUCCESS,
	payload: { data }
});

export const fetchWellsPlotFailure = error => ({
	type: FETCH_WELLS_PLOT_FAILURE,
	payload: { error }
});