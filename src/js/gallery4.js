import notifier from './service/notifler'
import photoApiService from './PhotoApiService';
import NewBtn from './service/newbutton';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import debounce from 'lodash.debounce';
import AOS from 'aos';
import 'aos/dist/aos.css';
import markupTpl from '../templates/markupAOS.hbs';

AOS.init();

const DEBOUNCE_DELAY = 300;

const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('.search-form__input'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
          
};

const gallery = new SimpleLightbox('.gallery a'); // створюємо модалку і передаємо велику картинку
const searchBtn = new NewBtn({ selector: '.search-form__button', hidden: false, text: 'Search' });
const observer = new IntersectionObserver((entries) => { 
    for (const entry of entries) {
        if (entry.isIntersecting && photoApiService.pageNumber > 1) {
            photoApiService.fetchPhoto().then(appendPhotoMarkUp);
        }
    }
}, { rootMargin: '400px' });

refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.input.addEventListener('input', debounce((() => searchBtn.enable()), DEBOUNCE_DELAY) );


function onSearchSubmit(event) {
    event.preventDefault(); // прибираємо дефолтову поведінку
    refs.galleryContainer.innerHTML = ''; // стартово прибираємо розмітку
    photoApiService.query = event.currentTarget.elements.searchQuery.value.trim(); //trim прибираються зайві пробіли
    if (photoApiService.query === '') { // перевіряємо чи взагалі щось введено 
        notifier.info("No request. Please try again.")
        return;
    }
    photoApiService.resetPage();
    photoApiService.resetViewedPhoto();

    photoApiService.fetchPhoto()
        .then(appendPhotoMarkUp)
        .catch(catchError)
        .finally(refs.searchForm.reset(),
                searchBtn.disabled()
    );
    
    observer.observe(refs.loadMoreBtn); // вішаємо обзервер для можливості скролу 
}
    

function appendPhotoMarkUp(photo) {
       
    if (photo.hits.length === 0) { // перевіряємо чи щось знайдено 
        notifier.warning("Sorry, there are no images matching your search query. Please try again.")
        return;
    }
    
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup(photo.hits));  
    gallery.refresh(); // Refresh Imag
    notifier.success(`Hooray! ${photoApiService.viewedPhoto} images for you from ${photo.totalHits} !`);
    
   if (photoApiService.viewedPhoto >= photo.totalHits) {
       notifier.warning(`We're sorry, but you've reached the end of search results. Total ${photo.totalHits}. `);
       observer.disconnect(); // знімаємо обзервер, так як показали все
       return;
    }
    
}
    
function markup(galleryItems) {
    return galleryItems.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
            markupTpl ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })).join('');
};
    
function catchError(error) {
        notifier.error('Something went wrong. Please try later');
        throw new Error(console.log(error));
    
    }

       

        

