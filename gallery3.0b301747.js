!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},t.parcelRequired7c6=n);var a=n("hzery"),l=n("1KhuP"),i=n("8IJcu"),d=n("co4Ad"),u=n("5IjG7"),s=n("l1Gdk");const f={searchForm:document.querySelector("#search-form"),input:document.querySelector(".search-form__input"),galleryContainer:document.querySelector(".gallery")},c=new(0,d.default)({selector:".load-more",hidden:!0,text:"Load-more"}),h=new(0,d.default)({selector:".search-form__button",hidden:!1,text:"Search"}),y=new(e(u))(".gallery a");function g(e){if(0!==e.hits.length){if(f.galleryContainer.insertAdjacentHTML("beforeend",(0,l.default)(e.hits)),y.refresh(),c.show(),c.textContent("Load more"),a.default.success(`Hooray! ${i.default.viewedPhoto} images for you from ${e.totalHits} !`),i.default.pageNumber>2){const{height:e}=f.galleryContainer.firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}return i.default.viewedPhoto>=e.totalHits?(a.default.info(`We're sorry, but you've reached the end of search results. Total ${e.totalHits}. `),void c.hide()):void 0}a.default.error("Sorry, there are no images matching your search query. Please try again.")}function m(e){throw a.default.error("Something went wrong. Please try later"),new Error(console.log(e))}f.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),f.galleryContainer.innerHTML="",c.hide(),i.default.query=e.currentTarget.elements.searchQuery.value.trim(),""===i.default.query)return void a.default.warning("No request. Please try again.");i.default.resetPage(),i.default.resetViewedPhoto(),i.default.fetchPhoto().then(g).catch(m).finally(f.searchForm.reset(),h.disabled())})),c.button.addEventListener("click",(function(){c.textContent("Loading..."),i.default.fetchPhoto().then(g).catch(m)})),f.input.addEventListener("input",e(s)((()=>h.enable()),300))}();
//# sourceMappingURL=gallery3.0b301747.js.map
