const API_ROOT = `http://localhost:3001/api/v1`;
const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

const authHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
};