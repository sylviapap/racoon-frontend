export const API_ROOT = `http://localhost:3001/api/v1`;
export const token = localStorage.getItem('token');

export const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const authHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
};

// fetch('http://localhost:3001/api/v1/map_markers', {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json', 
//       Accept: 'application/json'
//   },
//   body: JSON.stringify({user_id: 8})
// })
// .then(response => response.json())
// .then(data => console.log(data))