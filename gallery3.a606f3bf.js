function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},t.parcelRequired7c6=n);var a=n("cNM6c"),i=n("3huUq"),l=n("fxhcZ"),d=n("dwE1g"),u=n("fZKcF"),f=n("50Kfe");const s={searchForm:document.querySelector("#search-form"),input:document.querySelector(".search-form__input"),galleryContainer:document.querySelector(".gallery")},c=new(0,d.default)({selector:".load-more",hidden:!0,text:"Load-more"}),h=new(0,d.default)({selector:".search-form__button",hidden:!1,text:"Search"});function y(t){if(0===t.hits.length)return void a.default.error("Sorry, there are no images matching your search query. Please try again.");if(s.galleryContainer.insertAdjacentHTML("beforeend",(0,i.default)(t.hits)),l.default.pageNumber>2){const{height:e}=s.galleryContainer.firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}c.show(),c.textContent("Load more");if(new(e(u))(".gallery a").refresh(),l.default.viewedPhoto===t.totalHits)return a.default.info(`We're sorry, but you've reached the end of search results. Total ${t.totalHits}. `),void c.hide();a.default.success(`Hooray! ${l.default.viewedPhoto} images for you from ${t.totalHits} !`)}s.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),s.galleryContainer.innerHTML="",c.hide(),l.default.query=e.currentTarget.elements.searchQuery.value.trim(),""===l.default.query)return void a.default.warning("No request. Please try again.");l.default.resetPage(),l.default.resetViewedPhoto(),l.default.fetchPhoto().then(y).finally(s.searchForm.reset(),h.disabled())})),c.button.addEventListener("click",(function(){c.textContent("Loading..."),l.default.fetchPhoto().then(y)})),s.input.addEventListener("input",e(f)((()=>h.enable()),300));
//# sourceMappingURL=gallery3.a606f3bf.js.map
