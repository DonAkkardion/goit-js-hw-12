import{a as h,S as F,i as d}from"./assets/vendor-DjDxajEQ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(e){if(e.ep)return;e.ep=!0;const l=o(e);fetch(e.href,l)}})();const b="46354087-8e1a6a8f4ead0e3d6b452e4d6",C="https://pixabay.com/api/";async function w(r,t=1,o=15){const a=`${C}?key=${b}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${o}`;try{const e=await h.get(a);if(e.status!==200)throw new Error("Network response error");return e.data.hits}catch(e){throw console.error("Error fetching images:",e),e}}const m=document.querySelector(".gallery"),g=new F(".gallery a");function L(){m.innerHTML="",g.refresh()}function S(r){const t=r.map(o=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${o.largeImageURL}">
                <div class="large-img">
                    <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}">
                    <ul class="img-details">
                        <li><p>Likes</p><p>${o.likes}</p></li>
                        <li><p>Views</p><p>${o.views}</p></li>
                        <li><p>Comments</p><p>${o.comments}</p></li>
                        <li><p>Downloads</p><p>${o.downloads}</p></li>
                    </ul>
                </div>
            </a>
        </li>
    `).join("");m.insertAdjacentHTML("beforeend",t),g.refresh()}const E=document.querySelector(".search-form"),p=document.querySelector(".search-form-input"),i=document.querySelector(".loader"),s=document.querySelector(".load-more"),y=document.querySelector(".loading-text");document.querySelector(".gallery");let n=1,c="";E.addEventListener("submit",v);s.addEventListener("click",$);async function v(r){if(r.preventDefault(),c=p.value.trim(),c===""){d.error({title:"Error",message:"Please enter a search term.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FFF",titleColor:"#FFF",iconColor:"#FFF",timeout:5e3});return}p.value="",n=1,i.style.display="block",L(),await f(c,n)}async function $(){n++,s.style.display="none",y.style.display="block",i.style.display="block",s.disabled=!0,await f(c,n),s.textContent="Load more",s.disabled=!1,y.style.display="none",i.style.display="none"}async function f(r,t){i.style.display="block";try{const o=await w(r,t);i.style.display="none",o.length===0?d.info({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FFF",titleColor:"#FFF",iconColor:"#FFF",timeout:5e3}):(S(o),n===1&&(s.style.display="inline-block"),k(),q(o.length))}catch(o){i.style.display="none",d.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FFF",titleColor:"#FFF",iconColor:"#FFF",timeout:5e3}),console.error("Error fetching images:",o)}}function k(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}function q(r){r<15?(s.style.display="none",d.info({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FFF",titleColor:"#FFF",iconColor:"#FFF",timeout:5e3})):s.style.display="inline-block"}
//# sourceMappingURL=index.js.map
