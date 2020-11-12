const local = `http://localhost:3001`
const heroku = `https://racoon-backend.herokuapp.com`

export const API_ROOT = `${local}/api/v1`;

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