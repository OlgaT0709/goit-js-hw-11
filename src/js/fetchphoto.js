import axios, { isCancel, AxiosError } from 'axios';
import searchParamsStringify from './service/searchParamsStringify'

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34510807-7acb17c6314b40594d9f36171'

//функція робить HTTP-запит на ресурс і повертає проміс з масивом фото 

export default function fetchPhoto(photo) {

    const searchParams = {
        key: API_KEY,
        q: photo,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    }

    const queryString = searchParamsStringify(searchParams);
        
        return fetch(`${BASE_URL}?${queryString}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
};


