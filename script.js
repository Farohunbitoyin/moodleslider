const params = new URLSearchParams(window.location.search);

const images = [];

for (let i = 1; i <= 30; i++) {
    const img = params.get(`img${i}`);
    if (img) {
        images.push(img);
    }
}

const sliderWrapper = document.getElementById('sliderWrapper');
const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');
const thumbnailsContainer = document.getElementById('thumbnails');
const slideCounter = document.getElementById('slideCounter');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const fullscreenBtn = document.getElementById('fullscreenBtn');

let current = 0;

function updateUI() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbs = document.querySelectorAll('.thumbnail');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));

    if (slides[current]) slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (thumbs[current]) thumbs[current].classList.add('active');

    slideCounter.textContent = `Image ${current + 1} of ${images.length}`;
}

function showSlide(index) {
    if (images.length === 0) return;

    current = (index + images.length) % images.length;
    updateUI();
}

function buildSlider() {
    if (images.length === 0) {
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

        slide.appendChild(img);
        slider.appendChild(slide);

        const dot = document.createElement('button');
        dot.type = 'button';
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

prevBtn.addEventListener('click', () => showSlide(current - 1));
nextBtn.addEventListener('click', () => showSlide(current + 1));

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        sliderWrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showSlide(current + 1);
    if (event.key === 'ArrowLeft') showSlide(current - 1);
    if (event.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
            sliderWrapper.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

buildSlider();
