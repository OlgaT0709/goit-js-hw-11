import notifier from './notifler'
import markupTpl from '../partials/markup.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

import fetchPhoto from './fetchphoto';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    
};


// HTTP-запити виконуються при введенні назви після Сабміт
refs.searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
    event.preventDefault();
    refs.galleryContainer.innerHTML = '' // стартово прибираємо розмітку
    const photo = event.currentTarget.elements.searchQuery.value.trim(); // прибираються зайві пробіли
    if (!photo) {
        return; // якщо пустая строка, запит не відправляється
            }
    fetchPhoto(photo)  
        .then(photo => {
            
            const galleryItems = photo.hits;
            if (photo.hits.length === 0) {
                notifier.warning("Sorry, there are no images matching your search query. Please try again.")
                return;
            }
            
            refs.galleryContainer.insertAdjacentHTML('beforeend', createGalary(galleryItems))

            function createGalary(galleryItems) {
                return galleryItems.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
                    markupTpl({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })
                ).join('');
            };

            // створюємо модалку і передаємо велику картинку 
            new SimpleLightbox('.gallery a');

        })
        .catch((error) => {
        console.error(error); // dev
        notifier.error('Something went wrong. Please try later');
        })
        .finally(() => event.target.reset());
        
}

