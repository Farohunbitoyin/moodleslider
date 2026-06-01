const params = new URLSearchParams(window.location.search);

const images = [];

for(let i = 1; i <= 30; i++){
    const img = params.get(`img${i}`);
    if(img){
        images.push(img);
    }
}

const sliderWrapper = document.getElementById('sliderWrapper');
const sliderContainer = document.getElementById('sliderContainer');
const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');
const thumbnailsContainer = document.getElementById('thumbnails');
const slideCounter = document.getElementById('slideCounter');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let current = 0;

function updateUI(){
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbs = document.querySelectorAll('.thumbnail');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));

    if(slides[current]) slides[current].classList.add('active');
    if(dots[current]) dots[current].classList.add('active');
    if(thumbs[current]) thumbs[current].classList.add('active');

    slideCounter.textContent = `Image ${current + 1} of ${images.length}`;
}

function showSlide(index){
    if(images.length === 0) return;

    current = (index + images.length) % images.length;
    updateUI();
}

function nextSlide(event){
    if(event){
        event.preventDefault();
        event.stopPropagation();
    }

    showSlide(current + 1);
}

function prevSlide(event){
    if(event){
        event.preventDefault();
        event.stopPropagation();
    }

    showSlide(current - 1);
}

function toggleFullscreen(event){
    if(event){
        event.preventDefault();
        event.stopPropagation();
    }

    if(!document.fullscreenElement){
        sliderWrapper.requestFullscreen();
    }else{
        document.exitFullscreen();
    }
}

function buildSlider(){
    if(images.length === 0){
        slider.innerHTML = `
            <div class="error-box">
                No images supplied. Add image links using img1, img2, img3 and so on.
            </div>
        `;

        slideCounter.textContent = 'Image 0 of 0';
        return;
    }

    images.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.loading = 'lazy';

        img.addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            this.classList.toggle('zoomed');
        });

        slide.appendChild(img);
        slider.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');

        dot.addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            showSlide(index);
        });

        dotsContainer.appendChild(dot);

        const thumb = document.createElement('img');
        thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumb.src = src;
        thumb.alt = `Thumbnail ${index + 1}`;

        thumb.addEventListener('click', function(event){
            event.preventDefault();
            event.stopPropagation();
            showSlide(index);
        });

        thumbnailsContainer.appendChild(thumb);
    });

    updateUI();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight'){
        nextSlide(event);
    }

    if(event.key === 'ArrowLeft'){
        prevSlide(event);
    }

    if(event.key.toLowerCase() === 'f'){
        toggleFullscreen(event);
    }
});

let touchStartX = 0;
let touchStartY = 0;
let touchStartTarget = null;

sliderContainer.addEventListener('touchstart', (event) => {
    touchStartTarget = event.target;
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, {passive:true});

sliderContainer.addEventListener('touchend', (event) => {
    if(touchStartTarget && touchStartTarget.tagName === 'IMG'){
        return;
    }

    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if(Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)){
        if(diffX > 0){
            showSlide(current + 1);
        }else{
            showSlide(current - 1);
        }
    }
}, {passive:true});

buildSlider();
