import notifier from './service/notifler'
import markup from './service/markup'; 
import fetchPhoto from './fetchphoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"



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
    if (!photo) {return;} // якщо пустая строка, запит не відправляється
            
    fetchPhoto(photo)  // додаємо розмітку, якщо щось введно і знайшло
        .then(photo => {
            
            const galleryItems = photo.hits;
            if (galleryItems.length === 0) {
                notifier.warning("Sorry, there are no images matching your search query. Please try again.")
                return;
            }
            
            refs.galleryContainer.insertAdjacentHTML('beforeend', markup(galleryItems))

            // створюємо модалку і передаємо велику картинку 
            new SimpleLightbox('.gallery a');

        })
        .catch((error) => {
        console.error(error); // dev
        notifier.error('Something went wrong. Please try later');
        })
        .finally(() => event.target.reset());
        
}

