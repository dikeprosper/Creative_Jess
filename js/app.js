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

// Work grid — hover to preview (muted, thumbnail only), click card to open modal
document.querySelectorAll('.work-card.has-video').forEach(card => {
  const video = card.querySelector('.work-video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.muted = true;
    video.play().catch(() => {});
  });
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// Work project modal
const workModal = document.getElementById('workModal');
const workModalBackdrop = document.getElementById('workModalBackdrop');
const workModalClose = document.getElementById('workModalClose');
const workModalMedia = document.getElementById('workModalMedia');
const workModalTitle = document.getElementById('workModalTitle');
const workModalTag = document.getElementById('workModalTag');
const workModalDesc = document.getElementById('workModalDesc');

function openWorkModal(card) {
  const { title, tag, desc, video, poster, mood } = card.dataset;

  workModalTitle.textContent = title || '';
  workModalTag.textContent = tag || '';
  workModalDesc.textContent = desc || '';

  workModalMedia.innerHTML = '';
  workModalMedia.removeAttribute('data-mood');

  if (video) {
    const v = document.createElement('video');
    v.src = video;
    if (poster) v.poster = poster;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    workModalMedia.appendChild(v);
  } else {
    if (mood) workModalMedia.dataset.mood = mood;
    const label = document.createElement('span');
    label.className = 'work-modal-placeholder-label';
    label.textContent = 'Video coming soon';
    workModalMedia.appendChild(label);
  }

  workModal.classList.add('open');
  workModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
  workModal.classList.remove('open');
  workModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const playingVideo = workModalMedia.querySelector('video');
  if (playingVideo) playingVideo.pause();
}

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    openWorkModal(card);
  });
});

if (workModalBackdrop) workModalBackdrop.addEventListener('click', closeWorkModal);
if (workModalClose) workModalClose.addEventListener('click', closeWorkModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && workModal.classList.contains('open')) closeWorkModal();
});

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

