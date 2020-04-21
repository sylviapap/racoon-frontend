import {API_ROOT, token, authHeaders, headers} from './api'

const fetchInitialMap = () => {
    return(dispatch) => {
        return fetch(`${API_ROOT}/map_events`)
        .then(resp => resp.json())
        .then(json => {
            dispatch({ type: "GET_MAP", initialMap: json})
        })
    }
}

export default fetchInitialMap