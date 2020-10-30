import {API_ROOT} from '../services/api'

const fetchMyMap = () => {
    return (dispatch) => {
        fetch(`${API_ROOT}/map_markers`)
        .then(resp => resp.json())
        .then(json => {
            dispatch({ type: "GET_MY_MAP", myMap: json})
        })
    }
}

export default fetchMyMap