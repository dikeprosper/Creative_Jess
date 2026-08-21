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

// AI Photoshoot lightbox
const shootPhotos = [
  { src: 'media/photoshot/wbs-1.jpg', title: 'Women Business Summit', tag: 'Event & PR Coverage', desc: 'On-stage panel moment, mic in hand.' },
  { src: 'media/photoshot/wbs-2.jpg', title: 'Women Business Summit', tag: 'Event & PR Coverage', desc: 'Mid-conversation during a panel discussion.' },
  { src: 'media/photoshot/wbs-3.jpg', title: 'Women Business Summit', tag: 'Event & PR Coverage', desc: 'Candid networking moment at the reception.' },
  { src: 'media/photoshot/wbs-4.jpg', title: 'Women Business Summit', tag: 'Event & PR Coverage', desc: 'Group photo alongside fellow summit attendees.' },
  { src: 'media/photoshot/zr-1.jpg', title: 'Zipp Republic Campaign', tag: 'Streetwear Brand Content', desc: 'Moody close-up in branded cap and jersey.' },
  { src: 'media/photoshot/zr-2.jpg', title: 'Zipp Republic Campaign', tag: 'Streetwear Brand Content', desc: 'Dynamic action pose tossing the branded cap.' },
  { src: 'media/photoshot/zr-3.jpg', title: 'Zipp Republic Campaign', tag: 'Streetwear Brand Content', desc: 'Seated studio shot in full jersey fit.' },
  { src: 'media/photoshot/zr-4.jpg', title: 'Zipp Republic Campaign', tag: 'Streetwear Brand Content', desc: 'Seated studio shot, same fit, cap added.' },
  { src: 'media/photoshot/zr-5.jpg', title: 'Zipp Republic Campaign', tag: 'Streetwear Brand Content', desc: 'Second action pose for social cutdowns.' },
  { src: 'media/photoshot/studio-1.jpg', title: 'Studio Portrait Series', tag: 'Editorial & Fashion', desc: 'Close-up portrait in a pink tweed suit.' },
  { src: 'media/photoshot/studio-2.jpg', title: 'Studio Portrait Series', tag: 'Editorial & Fashion', desc: 'Candid laugh, same set and wardrobe.' },
  { src: 'media/photoshot/studio-3.jpg', title: 'Studio Portrait Series', tag: 'Editorial & Fashion', desc: 'Full-body studio shot, consistent lighting.' },
  { src: 'media/photoshot/studio-4.jpg', title: 'Studio Portrait Series', tag: 'Editorial & Fashion', desc: 'Half-body confident pose to close the set.' },
];

const shootLightbox = document.getElementById('shootLightbox');
const shootLightboxBackdrop = document.getElementById('shootLightboxBackdrop');
const shootLightboxClose = document.getElementById('shootLightboxClose');
const shootLightboxPrev = document.getElementById('shootLightboxPrev');
const shootLightboxNext = document.getElementById('shootLightboxNext');
const shootLightboxImg = document.getElementById('shootLightboxImg');
const shootLightboxTitle = document.getElementById('shootLightboxTitle');
const shootLightboxTag = document.getElementById('shootLightboxTag');
const shootLightboxCount = document.getElementById('shootLightboxCount');

let currentShootIndex = 0;

function renderShoot(index) {
  const total = shootPhotos.length;
  currentShootIndex = (index + total) % total;
  const photo = shootPhotos[currentShootIndex];

  shootLightboxImg.src = photo.src;
  shootLightboxImg.alt = photo.desc || photo.title;
  shootLightboxTitle.textContent = photo.title;
  shootLightboxTag.textContent = photo.tag;
  shootLightboxCount.textContent = `${photo.desc} · ${currentShootIndex + 1} / ${total}`;
}

function openShootLightbox(index) {
  renderShoot(index);
  shootLightbox.classList.add('open');
  shootLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeShootLightbox() {
  shootLightbox.classList.remove('open');
  shootLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.shoot-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    openShootLightbox(parseInt(btn.dataset.index, 10) || 0);
  });
});

if (shootLightboxPrev) shootLightboxPrev.addEventListener('click', () => renderShoot(currentShootIndex - 1));
if (shootLightboxNext) shootLightboxNext.addEventListener('click', () => renderShoot(currentShootIndex + 1));
if (shootLightboxBackdrop) shootLightboxBackdrop.addEventListener('click', closeShootLightbox);
if (shootLightboxClose) shootLightboxClose.addEventListener('click', closeShootLightbox);

document.addEventListener('keydown', (e) => {
  if (!shootLightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeShootLightbox();
  if (e.key === 'ArrowRight') renderShoot(currentShootIndex + 1);
  if (e.key === 'ArrowLeft') renderShoot(currentShootIndex - 1);
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

