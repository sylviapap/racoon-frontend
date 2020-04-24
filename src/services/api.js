export const API_ROOT = `http://localhost:3001/api/v1`;
export const token = localStorage.getItem('token');

export const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const authHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token
};