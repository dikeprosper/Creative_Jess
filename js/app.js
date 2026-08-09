// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('active', isOpen);
  });
}

// Showreel button — placeholder hook for a future video modal
const showreelBtn = document.getElementById('showreelBtn');
if (showreelBtn) {
  showreelBtn.addEventListener('click', () => {
    console.log('Showreel clicked — hook up a video modal here later.');
  });
}

// Hero video play button — placeholder hook
const videoPlay = document.querySelector('.video-play');
if (videoPlay) {
  videoPlay.addEventListener('click', () => {
    console.log('Play clicked — hook up real video source here later.');
  });
}