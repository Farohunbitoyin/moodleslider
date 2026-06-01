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

    slideCounter.textContent = `Slide ${current + 1} of ${images.length}`;

    const activeThumb = thumbs[current];

    if(activeThumb){
        activeThumb.scrollIntoView({
            behavior:'smooth',
            inline:'center',
            block:'nearest'
        });
    }
}

function showSlide(index){
    current = (index + images.length) % images.length;
    updateUI();
}

function nextSlide(){
    showSlide(current + 1);
}

function prevSlide(){
    showSlide(current - 1);
}

function toggleFullscreen(){
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

        slideCounter.textContent = 'Slide 0 of 0';
        return;
    }

    images.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Slide ${index + 1}`;
        img.loading = 'lazy';

        img.addEventListener('click', () => {
            img.classList.toggle('zoomed');
        });

        slide.appendChild(img);
        slider.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);

        const thumb = document.createElement('img');
        thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumb.src = src;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.addEventListener('click', () => showSlide(index));
        thumbnailsContainer.appendChild(thumb);
    });

    updateUI();
}

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);
fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight'){
        nextSlide();
    }

    if(event.key === 'ArrowLeft'){
        prevSlide();
    }

    if(event.key.toLowerCase() === 'f'){
        toggleFullscreen();
    }
});

let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
}, {passive:true});

sliderContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if(Math.abs(difference) > 50){
        if(difference > 0){
            nextSlide();
        }else{
            prevSlide();
        }
    }
}, {passive:true});

buildSlider();
