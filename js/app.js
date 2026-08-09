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

// Services — swap active row + sticky preview panel
const serviceRows = document.querySelectorAll('.service-row');
const previewFrame = document.getElementById('previewFrame');
const previewLabel = document.getElementById('previewLabel');
 
function setActiveService(row) {
  const item = row.closest('.service-item');
  const key = row.dataset.preview;
  const name = row.querySelector('.service-name').textContent;
 
  document.querySelectorAll('.service-item').forEach(li => li.classList.remove('active'));
  item.classList.add('active');
 
  if (previewFrame) previewFrame.dataset.active = key;
  if (previewLabel) previewLabel.textContent = name;
}
 
serviceRows.forEach(row => {
  row.addEventListener('mouseenter', () => setActiveService(row));
  row.addEventListener('focus', () => setActiveService(row));
  row.addEventListener('click', () => setActiveService(row));
});

