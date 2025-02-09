// header

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const header = document.getElementById('header');
const searchBar = document.getElementById('searchBar');
const searchToggle = document.getElementById('searchToggle');
const closeSearchBar = document.getElementById('closeSearchBar');

// Sidebar toggle
menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

// Close sidebar on outside click
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// Hide header on scroll down, show on scroll up
// let lastScrollTop = 0;
// window.addEventListener('scroll', () => {
//   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
//   if (currentScroll > lastScrollTop) {
//     header.classList.add('hidden'); 
//   } else {
//     header.classList.remove('hidden'); 
//   }
//   lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
// });

// Toggle search bar
searchToggle.addEventListener('click', (e) => {
  e.preventDefault();
  searchBar.classList.toggle('open');
});

// Close search bar
closeSearchBar.addEventListener('click', () => {
  searchBar.classList.remove('open');
});



// slider// Select elements
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.slider-nav button');
const slider = document.getElementById('slider');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');

let currentSlide = 0;

// Function to update the slider view
function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'inactive');
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.add('inactive');
    }
    navButtons[index].classList.toggle('active', index === currentSlide);
  });
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

// Move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}

// Move to a specific slide
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Add event listeners to arrows
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Add event listeners to navigation dots
navButtons.forEach((button, index) => {
  button.addEventListener('click', () => goToSlide(index));
});

// Auto-slide every 10 seconds
setInterval(nextSlide, 10000);

// Select the slider container
const sliderContainer = document.querySelector('.slider-container');

// Parallax effect for mouse movement
sliderContainer.addEventListener('mousemove', (event) => {
  const { offsetX, offsetY } = event; // Get mouse position within the container
  const { clientWidth, clientHeight } = sliderContainer; // Get container dimensions

  // Calculate the position relative to the center (-50% to 50%)
  const xPercent = (offsetX / clientWidth - 0.5) * 2; // Range: -1 to 1
  const yPercent = (offsetY / clientHeight - 0.5) * 2; // Range: -1 to 1

  // Scale the movement to a suitable range (e.g., 10% of the image size)
  const moveX = xPercent * 10; // Horizontal movement (positive/negative)
  const moveY = yPercent * 10; // Vertical movement (positive/negative)

  // Apply the movement to the active slide's background position
  const activeSlide = document.querySelector('.slide.active');
  if (activeSlide) {
    activeSlide.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`; // Centered + offset
  }
});



const swiper = new Swiper('.swiper', {
  slidesPerView: 2, // Show 2 items by default
  spaceBetween: 50, // Space between slides
  slidesPerGroup: 1, // Move 1 item per slide
  loop: true, // Infinite loop
  autoplay: {
      delay: 10000, // Auto slide every 10 seconds
      disableOnInteraction: false // Continue autoplay after swipe
  },
  grabCursor: true, // Show hand cursor on desktop
  speed: 2000, // Animation speed (1 second for smooth transition)
  breakpoints: {
      0: {
          slidesPerView: 1, // Show 1 item on mobile
      },
      768: {
          slidesPerView: 2, // Show 2 items on tablets and larger screens
      }
  }
});

// video section

const video = document.getElementById('videoPlayer');
const playButton = document.getElementById('playButton');
const playPauseIcon = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const playbackSpeed = document.getElementById('playbackSpeed');
const pictureInPicture = document.getElementById('pictureInPicture');
const downloadButton = document.getElementById('downloadVideo');
const nextVideoButton = document.getElementById('nextVideo');
const prevVideoButton = document.getElementById('prevVideo');
const muteToggle = document.getElementById('muteToggle');

const videoSources = ['video1.mp4', 'assets/images/video/cloudes.mp4', 'video3.mp4'];
let currentVideoIndex = 0;

playButton.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
    playButton.style.display = video.paused ? 'flex' : 'none';
    playPauseIcon.innerHTML = video.paused ? ' <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.79 33.24"><defs><style>.cls-1{fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:3px;}</style></defs><title>playone</title><polygon class="cls-1" points="25.79 16.62 1.5 2.6 1.5 30.64 25.79 16.62"/></svg>' : '⏸';
});

playPauseIcon.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
    playButton.style.display = video.paused ? 'flex' : 'none';
    playPauseIcon.innerHTML = video.paused ? '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.79 33.24"><defs><style>.cls-1{fill:none;stroke:#231f20;stroke-miterlimit:10;stroke-width:3px;}</style></defs><title>playone</title><polygon class="cls-1" points="25.79 16.62 1.5 2.6 1.5 30.64 25.79 16.62"/></svg>' : '⏸';
});

video.addEventListener('timeupdate', () => {
    progressBar.value = (video.currentTime / video.duration) * 100;
});

playbackSpeed.addEventListener('change', (event) => {
    video.playbackRate = event.target.value;
});

pictureInPicture.addEventListener('click', async () => {
    if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
        await video.requestPictureInPicture();
    }
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = videoSources[currentVideoIndex];
    link.download = videoSources[currentVideoIndex];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

nextVideoButton.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    video.src = videoSources[currentVideoIndex];
    video.play();
});

prevVideoButton.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    video.src = videoSources[currentVideoIndex];
    video.play();
});
muteToggle.addEventListener('click', () => {
  video.muted = !video.muted;
  muteToggle.innerHTML = video.muted ? '<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.45 78.45"><defs><style>.cls-1{fill:none;stroke:red;stroke-miterlimit:10;stroke-width:3px;}</style></defs><title>speakceroff</title><path d="M551.3,456.31q0,12.54,0,25.09a8.77,8.77,0,0,1-5.66,8.62,8.56,8.56,0,0,1-8.78-1.53q-8.05-6.42-16.06-12.86a3,3,0,0,0-2.08-.74c-1.8.06-3.61,0-5.41,0a10.74,10.74,0,0,1-11-11q0-7.59,0-15.16a10.73,10.73,0,0,1,10.95-11c1.84,0,3.68,0,5.51,0a2.86,2.86,0,0,0,2-.69q8.07-6.51,16.2-13a8.66,8.66,0,0,1,11.16,0,8.84,8.84,0,0,1,3.19,7.21Q551.29,443.77,551.3,456.31Zm-5.88.05q0-12.58,0-25.17a3,3,0,0,0-1.68-3,2.92,2.92,0,0,0-3.31.56l-16,12.8a1.47,1.47,0,0,0-.64,1.3q0,13.46,0,26.91a1.47,1.47,0,0,0,.62,1.31c3,2.35,5.93,4.73,8.89,7.11,2.41,1.93,4.81,3.88,7.24,5.79a2.84,2.84,0,0,0,4.58-1,4.62,4.62,0,0,0,.26-1.7Q545.42,468.8,545.42,456.36ZM517.89,469V443.59c-1.73,0-3.41,0-5.08,0a4.76,4.76,0,0,0-4.62,4.68c-.05,5.35,0,10.7,0,16.06a4.67,4.67,0,0,0,4,4.59C514.05,469.11,516,469,517.89,469Z" transform="translate(-501.52 -417.08)"/><path d="M578.76,457.26a29.63,29.63,0,0,1-7.52,19c-1.35,1.56-3.12,1.79-4.5.57s-1.28-2.91,0-4.41a24.51,24.51,0,0,0,.29-32,4.47,4.47,0,0,1-1-2,2.66,2.66,0,0,1,1.59-2.92,2.56,2.56,0,0,1,3.21.49,36.23,36.23,0,0,1,3.65,4.81C577.42,445.56,578.74,450.76,578.76,457.26Z" transform="translate(-501.52 -417.08)"/><path d="M567,456a18.71,18.71,0,0,1-5.12,13.21,2.86,2.86,0,0,1-3.08.91,2.82,2.82,0,0,1-2.06-2.25,3,3,0,0,1,.91-2.75,12.54,12.54,0,0,0,3.43-9.4,12.36,12.36,0,0,0-3.06-7.6,3.2,3.2,0,0,1-.91-2.42,2.94,2.94,0,0,1,5.13-1.7,18.15,18.15,0,0,1,4.52,9.57C566.92,454.46,567,455.41,567,456Z" transform="translate(-501.52 -417.08)"/><path d="M517.89,469c-1.94,0-3.84.15-5.71,0a4.67,4.67,0,0,1-4-4.59c0-5.36-.05-10.71,0-16.06a4.76,4.76,0,0,1,4.62-4.68c1.67-.05,3.35,0,5.08,0Z" transform="translate(-501.52 -417.08)"/><line class="cls-1" x1="77.39" y1="1.06" x2="1.06" y2="77.39"/></svg>' : '<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.47 68.62"><title>Untitled-1</title><path d="M551.3,456.31q0,12.54,0,25.09a8.77,8.77,0,0,1-5.66,8.62,8.56,8.56,0,0,1-8.78-1.53q-8.05-6.42-16.06-12.86a3,3,0,0,0-2.08-.74c-1.8.06-3.61,0-5.41,0a10.74,10.74,0,0,1-11-11q0-7.59,0-15.16a10.73,10.73,0,0,1,10.95-11c1.84,0,3.68,0,5.51,0a2.86,2.86,0,0,0,2-.69q8.07-6.51,16.2-13a8.66,8.66,0,0,1,11.16,0,8.84,8.84,0,0,1,3.19,7.21Q551.29,443.77,551.3,456.31Zm-5.88.05q0-12.58,0-25.17a3,3,0,0,0-1.68-3,2.92,2.92,0,0,0-3.31.56l-16,12.8a1.47,1.47,0,0,0-.64,1.3q0,13.46,0,26.91a1.47,1.47,0,0,0,.62,1.31c3,2.35,5.93,4.73,8.89,7.11,2.41,1.93,4.81,3.88,7.24,5.79a2.84,2.84,0,0,0,4.58-1,4.62,4.62,0,0,0,.26-1.7Q545.42,468.8,545.42,456.36ZM517.89,469V443.59c-1.73,0-3.41,0-5.08,0a4.76,4.76,0,0,0-4.62,4.68c-.05,5.35,0,10.7,0,16.06a4.67,4.67,0,0,0,4,4.59C514.05,469.11,516,469,517.89,469Z" transform="translate(-502.28 -421.99)"/><path d="M578.76,457.26a29.63,29.63,0,0,1-7.52,19c-1.35,1.56-3.12,1.79-4.5.57s-1.28-2.91,0-4.41a24.51,24.51,0,0,0,.29-32,4.47,4.47,0,0,1-1-2,2.66,2.66,0,0,1,1.59-2.92,2.56,2.56,0,0,1,3.21.49,36.23,36.23,0,0,1,3.65,4.81C577.42,445.56,578.74,450.76,578.76,457.26Z" transform="translate(-502.28 -421.99)"/><path d="M567,456a18.71,18.71,0,0,1-5.12,13.21,2.86,2.86,0,0,1-3.08.91,2.82,2.82,0,0,1-2.06-2.25,3,3,0,0,1,.91-2.75,12.54,12.54,0,0,0,3.43-9.4,12.36,12.36,0,0,0-3.06-7.6,3.2,3.2,0,0,1-.91-2.42,2.94,2.94,0,0,1,5.13-1.7,18.15,18.15,0,0,1,4.52,9.57C566.92,454.46,567,455.41,567,456Z" transform="translate(-502.28 -421.99)"/><path d="M517.89,469c-1.94,0-3.84.15-5.71,0a4.67,4.67,0,0,1-4-4.59c0-5.36-.05-10.71,0-16.06a4.76,4.76,0,0,1,4.62-4.68c1.67-.05,3.35,0,5.08,0Z" transform="translate(-502.28 -421.99)"/></svg>'; // Change icon based on mute state
});



// image background change

const images = [
  { url: 'assets/images/bannerImage.png', effect: 'zoom-out' },
  { url: 'assets/images/slider/2.png', effect: 'fade-right' },
  { url: 'assets/images/slider/1.png', effect: 'fade-left' }
];
let index = 0;
const bg1 = document.getElementById('background1');
const bg2 = document.getElementById('background2');

function changeBackground() {
  const nextIndex = (index + 1) % images.length;
  const activeBg = index % 2 === 0 ? bg1 : bg2;
  const inactiveBg = index % 2 === 0 ? bg2 : bg1;
  
  inactiveBg.style.backgroundImage = `url(${images[nextIndex].url})`;
  inactiveBg.style.opacity = 1;
  inactiveBg.className = `background ${images[nextIndex].effect}`;
  activeBg.style.opacity = 0;
  activeBg.className = 'background';
  
  index = nextIndex;
}

setInterval(changeBackground, 3000);
bg1.style.backgroundImage = `url(${images[0].url})`;
bg2.style.backgroundImage = `url(${images[1].url})`;


// footer carousle

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".custom-slider-container", {
      slidesPerView: 5,
      spaceBetween: 10,
      loop: true,
      autoplay: {
          delay: 2000,
          disableOnInteraction: false,
      },
      speed: 600,
      breakpoints: {
          1200: { slidesPerView: 5 },
          992: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          576: { slidesPerView: 2 },
          320: { slidesPerView: 2 }
      }
  });
});


// image gallery 
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
  });
});


// translate

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
  pageLanguage: 'en',
  autoDisplay: 'true',
  includedLanguages:'en,hi,kn', 
  layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
  }, 'google_translate_element');
  }


// animation

AOS.init();