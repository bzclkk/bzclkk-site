
const audio = document.getElementById('audio');
const seek = document.getElementById('seek');
const currentTimeDisplay = document.getElementById('current');
const durationDisplay = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const tracks = [
  { title: "Loose", artist: "Daniel Caesar", src: "loose.mp3" },
  { title: "Get You ft. Kali Uchis", artist: "Daniel Caesar", src: "get_you.mp3" },
  { title: "Best Part ft. H.E.R", artist: "Daniel Caesar", src: "best_part.mp3" }
];

let currentTrack = Math.floor(Math.random() * tracks.length);

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  audio.load();
  audio.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
}

audio.addEventListener('loadedmetadata', () => {
  seek.max = Math.floor(audio.duration);
  durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seek.value = Math.floor(audio.currentTime);
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

seek.addEventListener('input', () => {
  audio.currentTime = seek.value;
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

loadTrack(currentTrack);
