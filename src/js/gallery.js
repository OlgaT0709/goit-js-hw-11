import notifier from './service/notifler'
import markup from './service/markup'; 
import PhotoApiService from './PhotoApiService';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"



const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    buttonLoadMore: document.querySelector('button.load-more'),
    
};

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.buttonLoadMore.addEventListener('click', onLoadMoreClick);

           
function onSearchSubmit(event) {
    event.preventDefault();
    refs.galleryContainer.innerHTML = '' // стартово прибираємо розмітку
    refs.buttonLoadMore.classList.add('is-hidden');
    photoApiService.query = event.currentTarget.elements.searchQuery.value.trim(); //trim прибираються зайві пробіли
    if (photoApiService.query === '') {
        notifier.info("No request. Please try again.")
        return;
    }
    photoApiService.resetPage();
    photoApiService.fetchPhoto().then(appendPhotoMarkUp);
    refs.searchForm.reset();
}
    
function onLoadMoreClick() {
    refs.buttonLoadMore.textContent = 'Loading...';
    photoApiService.fetchPhoto().then(appendPhotoMarkUp);
    refs.buttonLoadMore.textContent = 'Load more';
};

function appendPhotoMarkUp(photo) {
    if (!photo) {
        return;
    } // якщо пустая строка, запит не відправляється
            
    if (photo.length === 0) {
        notifier.warning("Sorry, there are no images matching your search query. Please try again.")
        return;
    }
            
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup(photo));
    refs.buttonLoadMore.classList.remove('is-hidden');
    refs.buttonLoadMore.classList.add('animation');                 
                        
    // створюємо модалку і передаємо велику картинку 
    new SimpleLightbox('.gallery a');

}
        
       

        

