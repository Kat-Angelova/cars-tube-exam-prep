import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//special requests for this SPA

export async function getAllCarListings() {
    return await api.get(host + '/data/cars?sortBy=_createdOn%20desc');
}

export async function getCarListingById(id){
    return await api.get(host + '/data/cars/' + id);
}

export async function createCarListing(data){
    return await api.post(host + '/data/cars', data);
}
 
export async function editCarListing(id, data){
    return await api.put(host + `/data/cars/${id}`, data);
}

export async function deleteCarListing(id){
    return await api.del(host + `/data/cars/${id}`);
}

export async function getMyCarListings(ownerId){
    return await api.get(host + `/data/cars?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`);
}

export async function getSearch(query) {
    return await api.get(host + `/data/cars?where=year%3D${query}`);
}