import axios from 'axios';
import searchParamsStringify from './service/searchParamsStringify';
import notifier from './service/notifler';

//клас робить HTTP-запит на ресурс і повертає масив фото

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    fetchPhoto() {

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34510807-7acb17c6314b40594d9f36171';

    const searchParams = {
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.pageNumber,
        per_page: 40,
    }

    const queryString = searchParamsStringify(searchParams);
        
        return axios.get(`${BASE_URL}?${queryString}`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                this.incrementPage()
                return data.hits;
            })
            .catch(error => {
                notifier.error('Something went wrong. Please try later');
                throw new Error(error.response.status);
            
            })
     
      
        // Якщо не використовувати axios
        // return fetch(`${BASE_URL}?${queryString}`).then(response => {
        //     if (!response.ok) { throw new Error(response.status);
        //     }
        //     return response.json();
        //     })
    };

    incrementPage() {
        this.pageNumber += 1;
    }

    resetPage() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}




