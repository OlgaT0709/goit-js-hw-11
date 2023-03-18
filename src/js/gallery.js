import notifier from './notifler'

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

import fetchPhoto from './fetchphoto';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    
};

refs.searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
    event.preventDefault();
    refs.galleryContainer.innerHTML = ''
    const photo = event.currentTarget.elements.searchQuery.value;

    fetchPhoto(photo)  
        .then(photo => {
            const galleryItems = photo.hits;
            if (photo.hits.length === 0) {
                notifier.warning("Sorry, there are no images matching your search query. Please try again.")
                return;
            }
            
            refs.galleryContainer.insertAdjacentHTML('beforeend', createGalary(galleryItems))

            function createGalary(galleryItems) {
                return galleryItems.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
                    return `
                    <div class="photo-card">
                        <a class="gallery__item" href="${largeImageURL}">
                            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                        </a>
                        <div class="info">
                            <p class="info-item">
                            <b>Likes </b></br> ${likes}
                            </p>
                            <p class="info-item">
                            <b>Views </b></br> ${views}
                            </p>
                            <p class="info-item">
                            <b>Comments </b></br> ${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads </b></br> ${downloads}
                            </p>
                        </div>
                    </div>
                     `;
                }).join('');
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

