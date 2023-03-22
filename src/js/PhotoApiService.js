import axios from 'axios';
import searchParamsStringify from './service/searchParamsStringify';

//клас робить HTTP-запит на ресурс і повертає дані (об'єкт)

class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
        this.viewedPhoto = 0;
        this.perPage = 40;
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
        per_page: this.perPage,
    }

    const queryString = searchParamsStringify(searchParams);
        
        return axios.get(`${BASE_URL}?${queryString}`)
            .then(response => {
                // if (!response.ok) {
                //     throw new Error(response.status);
                // };
                return response.data;
            })
            .then(data => {
                this.#incrementPage();
                this.viewedPhoto += data.hits.length;
                return data;
            })
            
      
        // Якщо не використовувати axios
        // return fetch(`${BASE_URL}?${queryString}`).then(response => {
        //     if (!response.ok) { throw new Error(response.status);
        //     }
        //     return response.json();
        //     })

        // .catch((error) => console.log(error));
    };

     
    resetViewedPhoto() {
        this.viewedPhoto = 0;
    }


    #incrementPage() {
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


export default new PhotoApiService();

