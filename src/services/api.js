export const API_ROOT = ` https://racoon-backend.herokuapp.com/api/v1`;
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