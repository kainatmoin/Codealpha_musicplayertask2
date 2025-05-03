const audio = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const tracks = Array.from(playlist.getElementsByTagName("li"));
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let currentTrack = 0;

// Load initial track
loadTrack(currentTrack);

function loadTrack(index) {
  audio.src = tracks[index].getAttribute("data-src");
  highlightTrack(index);
}

function highlightTrack(index) {
  tracks.forEach(track => track.classList.remove("active"));
  tracks[index].classList.add("active");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

tracks.forEach((track, index) => {
  track.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(index);
    audio.play();
    playBtn.textContent = "⏸️";
  });
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
