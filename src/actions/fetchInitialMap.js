import {API_ROOT, token, authHeaders, headers} from './api'

export const fetchInitialMap = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/api/v1/map_markers')
        .then(resp => resp.json())
        // .then(r => console.log(r))
        .then(json => {
            dispatch({ type: "GET_MAP", initialMap: json})
        })
    }
}