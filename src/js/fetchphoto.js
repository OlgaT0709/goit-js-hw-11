import axios from 'axios';
import searchParamsStringify from './service/searchParamsStringify'

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34510807-7acb17c6314b40594d9f36171';
const pageNumber = 1;

//функція робить HTTP-запит на ресурс і повертає проміс з масивом фото 

export default function fetchPhoto(photo) {

    const searchParams = {
        key: API_KEY,
        q: photo,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: 40,
    }

    const queryString = searchParamsStringify(searchParams);
        
    return axios.get(`${BASE_URL}?${queryString}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response.status);
        });
      
    // return fetch(`${BASE_URL}?${queryString}`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         return response.json();
    //     })
};


